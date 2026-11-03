import { useState } from "react";
import "./App.css";

const SERVIDOR = "https://TU-DIRECCION.trycloudflare.com";

// Crea (o recupera) un código único para este dispositivo
function obtenerIdDispositivo() {
  try {
    let id = localStorage.getItem("dispositivoId");
    if (!id) {
      id = crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString(36) + Math.random().toString(36).slice(2);
      localStorage.setItem("dispositivoId", id);
    }
    return id;
  } catch {
    return "sin-storage-" + Math.random().toString(36).slice(2);
  }
}

function leerYaPidio() {
  try {
    return localStorage.getItem("yaPidio") === "si";
  } catch {
    return false;
  }
}

function App() {
  const [estado, setEstado] = useState(
    leerYaPidio() ? "Ya pediste tu postal desde este dispositivo" : ""
  );
  const [cargando, setCargando] = useState(false);
  const [presionado, setPresionado] = useState(false);
  const [usado, setUsado] = useState(leerYaPidio);

  const marcarComoPedido = () => {
    setUsado(true);
    try {
      localStorage.setItem("yaPidio", "si");
    } catch {}
  };

  const girarMotor = async () => {
    setCargando(true);
    setEstado("");
    try {
      const r = await fetch(`${SERVIDOR}/girar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dispositivoId: obtenerIdDispositivo() }),
      });
      const data = await r.json();

      if (data.ok) {
        marcarComoPedido();
        setEstado("Pedido enviado, tu postal está saliendo");
      } else if (data.yaPidio) {
        marcarComoPedido();
        setEstado("Ya pediste tu postal desde este dispositivo");
      } else {
        setEstado("Error: " + data.error);
      }
    } catch (e) {
      setEstado("No se pudo contactar al servidor");
    } finally {
      setCargando(false);
    }
  };

  const alSoltar = () => setPresionado(false);

  const alHacerClick = () => {
    if (usado || cargando) return;
    girarMotor();
  };

  const clases = [
    "circulo",
    presionado ? "presionado" : "",
    usado ? "usado" : "",
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
          disabled={cargando || usado}
          aria-label="Pedí tu postal"
        >
          <span>
            PEDÍ TU
            <br />
            POSTAL
          </span>
        </button>

        <p className="estado" aria-live="polite">
          {estado}
        </p>
      </footer>
    </div>
  );
}

export default App;