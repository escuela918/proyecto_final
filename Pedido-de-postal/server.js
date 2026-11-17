import express from 'express';
import mqtt from 'mqtt';
import cors from 'cors';

const app = express();
const PORT = 3000;
const BROKER_URL = process.env.BROKER_URL || 'mqtt://10.56.2.30:1883';
const TOPICO = 'expendedora/motor';          // acá mandamos "girar"
const TOPICO_ESTADO = 'expendedora/estado';  // acá el ESP avisa "terminado" (opcional)
const BLOQUEO_MS = 9 * 1000;                 // bloqueado 9 segundos
const MOSTRAR_ENTREGADA_MS = 2000;           // mínimo que se muestra "Postal entregada"

app.use(cors());
app.use(express.json());

// ---------- Estado de la máquina ----------
// fase: 'libre' | 'girando' | 'terminado'
let fase = 'libre';
let hasta = 0;         // hasta cuándo dura el bloqueo
let temporizador = null;

function pasarA(nuevaFase, duracionMs) {
  clearTimeout(temporizador);
  fase = nuevaFase;
  hasta = duracionMs ? Date.now() + duracionMs : 0;
  console.log('🔁 Fase:', fase);

  if (nuevaFase === 'girando') {
    // Si el ESP no avisa, se libera solo a los 9 segundos
    temporizador = setTimeout(() => pasarA('libre'), duracionMs);
  } else if (nuevaFase === 'terminado') {
    temporizador = setTimeout(() => pasarA('libre'), duracionMs);
  }
}

// ---------- MQTT ----------
const cliente = mqtt.connect(BROKER_URL, {
  clientId: 'servidor-expendedora-' + Math.random().toString(16).slice(2, 8),
  reconnectPeriod: 2000,
  connectTimeout: 5000,
  // username: 'usuario',
  // password: 'clave',
});

cliente.on('connect', () => {
  console.log(`✅ Conectado al broker MQTT ${BROKER_URL}`);
  cliente.subscribe(TOPICO_ESTADO, { qos: 1 });
});
cliente.on('reconnect', () => console.log('🔄 Reintentando conexión al broker...'));
cliente.on('offline', () => console.log('⚠️ Broker desconectado'));
cliente.on('error', (err) => console.error('❌ Error MQTT:', err.message));

// Si el ESP publica "terminado" en expendedora/estado, se desbloquea antes del minuto
cliente.on('message', (topico, mensaje) => {
  const texto = mensaje.toString().trim().toLowerCase();
  console.log('📥', topico, ':', texto);
  if (topico === TOPICO_ESTADO && ['terminado', 'listo', 'ok'].includes(texto) && fase === 'girando') {
    // Muestra "entregada" lo que falte de los 9 segundos (mínimo 2 s)
    pasarA('terminado', Math.max(MOSTRAR_ENTREGADA_MS, hasta - Date.now()));
  }
});

// ---------- Rutas ----------
app.get('/', (req, res) => {
  res.send(`Servidor funcionando. Broker conectado: ${cliente.connected ? 'SÍ' : 'NO'}. Fase: ${fase}`);
});

// La página consulta esto cada segundo para mostrar en qué paso está
app.get('/estado', (req, res) => {
  res.json({
    fase,
    restante: hasta ? Math.max(0, Math.ceil((hasta - Date.now()) / 1000)) : 0,
    broker: cliente.connected,
  });
});

app.post('/girar', (req, res) => {
  if (fase !== 'libre') {
    return res.status(409).json({ ok: false, ocupado: true, error: 'La máquina está ocupada' });
  }
  if (!cliente.connected) {
    return res.status(503).json({ ok: false, error: 'Sin conexión al broker' });
  }

  // Bloqueamos ya, para que nadie más apriete mientras se envía
  pasarA('girando', BLOQUEO_MS);

  let respondido = false;
  const timeout = setTimeout(() => {
    if (respondido) return;
    respondido = true;
    pasarA('libre');
    res.status(504).json({ ok: false, error: 'El broker no respondió' });
  }, 5000);

  cliente.publish(TOPICO, 'girar', { qos: 1 }, (err) => {
    clearTimeout(timeout);
    if (respondido) return;
    respondido = true;

    if (err) {
      console.error('❌ Error al publicar:', err.message);
      pasarA('libre');
      return res.status(500).json({ ok: false, error: err.message });
    }
    console.log('📤 Mensaje enviado a', TOPICO, ': girar');
    res.json({ ok: true });
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌐 Servidor en http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  console.log('\n👋 Cerrando servidor...');
  cliente.end(false, () => process.exit(0));
});