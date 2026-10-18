import React from "react";
import "../styles/biblioteca.css";

const obras = {
  ficciones: {
    titulo: "Ficciones",
    pdf: "/pdf/ficciones.pdf",
  },

  aleph: {
    titulo: "El Aleph",
    pdf: "/pdf/el-aleph.pdf",
  },

  libroArena: {
    titulo: "El libro de arena",
    pdf: "/pdf/el-libro-de-arena.pdf",
  },

  bibliotecaBabel: {
    titulo: "La biblioteca de Babel",
    pdf: "/pdf/biblioteca-de-babel.pdf",
  },
};

export function obtenerLibro(libro) {
  return obras[libro];
}

export default obras;