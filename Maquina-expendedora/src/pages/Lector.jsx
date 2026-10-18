import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/lector.css";
import obras from "../components/biblioteca";
import PdfViewer from "../components/PdfViewer";

// Orden de lectura (el mismo que en la Home) y títulos para mostrar.
const LIBROS = [
  { id: "ficciones", titulo: "Ficciones" },
  { id: "aleph", titulo: "El Aleph" },
  { id: "libroArena", titulo: "El libro de arena" },
  { id: "bibliotecaBabel", titulo: "La biblioteca de Babel" },
];

const MODO_KEY = "lector-modo";

function Lector() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Recuerda el último modo elegido (libro / vertical).
  const [modo, setModo] = useState(() => {
    try {
      return localStorage.getItem(MODO_KEY) || "libro";
    } catch {
      return "libro";
    }
  });

  const cambiarModo = (nuevo) => {
    setModo(nuevo);
    try {
      localStorage.setItem(MODO_KEY, nuevo);
    } catch {
      /* ignorar */
    }
  };

  const indice = LIBROS.findIndex((l) => l.id === id);
  const actual = LIBROS[indice];
  const libro = obras[id];

  // Circular: después del último vuelve al primero y viceversa.
  const anterior = LIBROS[(indice - 1 + LIBROS.length) % LIBROS.length];
  const siguiente = LIBROS[(indice + 1) % LIBROS.length];

  // Siempre vuelve a la página principal (Home restaura el scroll guardado).
  const volver = () => navigate("/");

  // replace: así el historial del navegador no se llena de libros.
  const irA = (libroId) => navigate(`/leer/${libroId}`, { replace: true });

  if (!actual || !libro || !libro.pdf) {
    return (
      <div className="lector">
        <div className="lector-bar">
          <button className="lector-back mono" onClick={volver}>← VOLVER</button>
        </div>
        <div className="lector-error">
          <p>No se encontró el libro solicitado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lector">
      <div className="lector-bar">
        <button className="lector-back mono" onClick={volver}>← VOLVER</button>

        <div className="lector-title">
          <span className="serif">{actual.titulo}</span>
          <span className="mono lector-count">{indice + 1} / {LIBROS.length}</span>
        </div>

        <div className="lector-modes">
          <button
            className={`lector-mode mono ${modo === "libro" ? "active" : ""}`}
            onClick={() => cambiarModo("libro")}
          >
            LIBRO
          </button>
          <button
            className={`lector-mode mono ${modo === "vertical" ? "active" : ""}`}
            onClick={() => cambiarModo("vertical")}
          >
            VERTICAL
          </button>
        </div>

        <a
          className="lector-open mono"
          href={libro.pdf}
          target="_blank"
          rel="noopener noreferrer"
        >
          NUEVA PESTAÑA ↗
        </a>
      </div>

      <PdfViewer key={id} file={libro.pdf} modo={modo} />

      <div className="lector-nav">
        <button className="lector-nav-btn" onClick={() => irA(anterior.id)}>
          <span className="mono">← LIBRO ANTERIOR</span>
          <strong className="serif">{anterior.titulo}</strong>
        </button>

        <button className="lector-nav-btn lector-nav-next" onClick={() => irA(siguiente.id)}>
          <span className="mono">LIBRO SIGUIENTE →</span>
          <strong className="serif">{siguiente.titulo}</strong>
        </button>
      </div>
    </div>
  );
}

export default Lector;