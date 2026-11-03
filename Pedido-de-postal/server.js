import express from 'express';
import mqtt from 'mqtt';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = 3000;
const TOPICO = 'expendedora/motor';
const ARCHIVO_PEDIDOS = './pedidos.json';
const CLAVE_ADMIN = 'etec2026'; // clave para reiniciar los pedidos (cambiala)

app.use(cors());
app.use(express.json());

// ====== Dispositivos que ya pidieron (se guardan en pedidos.json) ======
let dispositivosQuePidieron = new Set();
try {
  const datos = JSON.parse(fs.readFileSync(ARCHIVO_PEDIDOS, 'utf8'));
  dispositivosQuePidieron = new Set(datos);
  console.log(`📂 Cargados ${dispositivosQuePidieron.size} pedidos anteriores`);
} catch {
  console.log('📂 Sin pedidos anteriores, empezando de cero');
}

function guardarPedidos() {
  fs.writeFileSync(ARCHIVO_PEDIDOS, JSON.stringify([...dispositivosQuePidieron]));
}

// ====== Conexión al broker Mosquitto ======
const cliente = mqtt.connect('mqtt://10.56.2.30:1883', {
  clientId: 'servidor-expendedora-' + Math.random().toString(16).slice(2, 8),
  reconnectPeriod: 2000,
  // username: 'usuario',
  // password: 'clave',
});

cliente.on('connect', () => console.log('✅ Conectado al broker MQTT 10.56.2.30'));
cliente.on('reconnect', () => console.log('🔄 Reintentando conexión al broker...'));
cliente.on('offline', () => console.log('⚠️ Broker desconectado'));
cliente.on('error', (err) => console.error('❌ Error MQTT:', err.message));

// ====== Rutas ======
app.get('/', (req, res) => {
  res.send(
    `Servidor funcionando. Broker conectado: ${cliente.connected ? 'SÍ' : 'NO'}. ` +
    `Pedidos hechos: ${dispositivosQuePidieron.size}`
  );
});

app.post('/girar', (req, res) => {
  const { dispositivoId } = req.body || {};

  if (!dispositivoId) {
    return res.status(400).json({ ok: false, error: 'Falta el identificador del dispositivo' });
  }

  if (dispositivosQuePidieron.has(dispositivoId)) {
    console.log('⛔ Pedido rechazado, el dispositivo ya pidió:', dispositivoId);
    return res.status(403).json({ ok: false, yaPidio: true, error: 'Este dispositivo ya hizo su pedido' });
  }

  if (!cliente.connected) {
    return res.status(503).json({ ok: false, error: 'Sin conexión al broker' });
  }

  // Se anota antes de publicar para que un doble clic no pase dos veces
  dispositivosQuePidieron.add(dispositivoId);

  cliente.publish(TOPICO, 'girar', { qos: 1 }, (err) => {
    if (err) {
      dispositivosQuePidieron.delete(dispositivoId); // si falló, puede volver a intentar
      console.error('❌ Error al publicar:', err.message);
      return res.status(500).json({ ok: false, error: err.message });
    }
    guardarPedidos();
    console.log(`📤 Pedido #${dispositivosQuePidieron.size} enviado (dispositivo ${dispositivoId})`);
    res.json({ ok: true });
  });
});

// Para borrar todos los pedidos (por ejemplo, antes de una presentación)
app.post('/reiniciar', (req, res) => {
  if (req.body?.clave !== CLAVE_ADMIN) {
    return res.status(401).json({ ok: false, error: 'Clave incorrecta' });
  }
  dispositivosQuePidieron.clear();
  guardarPedidos();
  console.log('🧹 Pedidos reiniciados');
  res.json({ ok: true });
});

app.listen(PORT, '0.0.0.0', () => console.log(`🌐 Servidor en http://localhost:${PORT}`));