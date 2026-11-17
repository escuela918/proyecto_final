import { useEffect, useState } from "react";
import "./App.css";

// Misma PC desde donde se abrió la página, puerto 3000 (server.js)
const SERVIDOR = `http://${window.location.hostname}:3000`;

function App() {
  const [fase, setFase] = useState("cargando"); // libre | girando | terminado | desconectado | sin-servidor
  const [restante, setRestante] = useState(0);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [presionado, setPresionado] = useState(false);

  // Consulta al servidor cada 1 segundo en qué paso está la máquina
  useEffect(() => {
    let activo = true;
    const consultar = async () => {
      try {
        const r = await fetch(`${SERVIDOR}/estado`);
        const data = await r.json();
        if (!activo) return;
        setFase(data.broker ? data.fase : "desconectado");
        setRestante(data.restante);
      } catch {
        if (activo) setFase("sin-servidor");
      }
    };
    consultar();
    const intervalo = setInterval(consultar, 1000);
    return () => {
      activo = false;
      clearInterval(intervalo);
    };
  }, []);

  const girarMotor = async () => {
    setEnviando(true);
    setError("");
    try {
      const r = await fetch(`${SERVIDOR}/girar`, { method: "POST" });
      const data = await r.json();
      if (data.ok) {
        setFase("girando");
      } else if (!data.ocupado) {
        setError("Error: " + data.error);
      }
    } catch {
      setError("No se pudo contactar al servidor");
    } finally {
      setEnviando(false);
    }
  };

  const bloqueado = enviando || fase !== "libre";

  // Texto del paso actual
  let mensaje;
  if (error) mensaje = error;
  else if (enviando) mensaje = "Enviando tu pedido...";
  else if (fase === "girando")
    mensaje = `Tu postal está saliendo... (${restante}s)`;
  else if (fase === "terminado") mensaje = "Postal entregada";
  else if (fase === "libre") mensaje = "Listo, apretá el botón";
  else if (fase === "desconectado") mensaje = "La máquina no está conectada";
  else if (fase === "sin-servidor") mensaje = "No se pudo contactar al servidor";
  else mensaje = "Conectando...";

  const alSoltar = () => setPresionado(false);

  const alHacerClick = () => {
    if (bloqueado) return;
    girarMotor();
  };

  const clases = [
    "circulo",
    presionado ? "presionado" : "",
    bloqueado ? "usado" : "",
  ].join(" ");

  return (
    <div className="pantalla">
      <header className="encabezado">
        <p className="bajada">
          Un proyecto lúdico para acercarnos
          <br />
          a las obras de Jorge Luis Borges
        </p>
      </header>

      <main className="centro">
        <h1 className="titulo">
          Gachapostales
          <br />
          Borgianas
        </h1>
      </main>

      <footer className="pie">
        <button
          className={clases}
          onPointerDown={() => setPresionado(true)}
          onPointerUp={alSoltar}
          onPointerLeave={alSoltar}
          onPointerCancel={alSoltar}
          onContextMenu={(e) => e.preventDefault()}
          onClick={alHacerClick}
          disabled={bloqueado}
          aria-label="Pedí tu postal"
        >
          <span>
            PEDÍ TU
            <br />
            POSTAL
          </span>
        </button>

        {/* Misma tipografía y tamaño que el subtítulo */}
        <p className="estado bajada" aria-live="polite">
          {mensaje}
        </p>
      </footer>
    </div>
  );
}

export default App;