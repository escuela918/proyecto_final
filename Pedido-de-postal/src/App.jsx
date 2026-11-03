import { useState } from "react";
import "./App.css";

const SERVIDOR = "http://localhost:3000";

function App() {
  const [estado, setEstado] = useState("");
  const [cargando, setCargando] = useState(false);
  const [presionado, setPresionado] = useState(false);
  const [usado, setUsado] = useState(false);

  const girarMotor = async () => {
    setCargando(true);
    setEstado("");
    try {
      const r = await fetch(`${SERVIDOR}/girar`, { method: "POST" });
      const data = await r.json();
      if (data.ok) {
        setEstado("Pedido enviado, el motor está girando");
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
    setUsado(true);
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
          disabled={cargando}
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