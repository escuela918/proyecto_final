import express from 'express';
import mqtt from 'mqtt';
import cors from 'cors';

const app = express();
const PORT = 3000;
const TOPICO = 'expendedora/motor';

// Permite que la página de React (otro puerto) llame al servidor
app.use(cors());
app.use(express.json());

// Conexión al broker Mosquitto
const cliente = mqtt.connect('mqtt://10.56.2.30:1883', {
  clientId: 'servidor-expendedora-' + Math.random().toString(16).slice(2, 8),
  reconnectPeriod: 2000, // reintenta cada 2 segundos si se corta
  // username: 'usuario',   // descomentá si el broker pide login
  // password: 'clave',
});

cliente.on('connect', () => console.log('✅ Conectado al broker MQTT 10.56.2.30'));
cliente.on('reconnect', () => console.log('🔄 Reintentando conexión al broker...'));
cliente.on('offline', () => console.log('⚠️ Broker desconectado'));
cliente.on('error', (err) => console.error('❌ Error MQTT:', err.message));

// Ruta de prueba: abrí http://localhost:3000 para ver si el servidor anda
app.get('/', (req, res) => {
  res.send(`Servidor funcionando. Broker conectado: ${cliente.connected ? 'SÍ' : 'NO'}`);
});

// Cuando la página llama a /girar, se publica el mensaje
app.post('/girar', (req, res) => {
  if (!cliente.connected) {
    return res.status(503).json({ ok: false, error: 'Sin conexión al broker' });
  }

  cliente.publish(TOPICO, 'girar', { qos: 1 }, (err) => {
    if (err) {
      console.error('❌ Error al publicar:', err.message);
      return res.status(500).json({ ok: false, error: err.message });
    }
    console.log('📤 Mensaje enviado a', TOPICO, ': girar');
    res.json({ ok: true });
  });
});

app.listen(PORT, () => console.log(`🌐 Servidor en http://localhost:${PORT}`));