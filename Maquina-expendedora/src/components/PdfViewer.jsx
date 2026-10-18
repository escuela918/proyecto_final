import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// Límites del zoom (1 = se ajusta a la pantalla).
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 2.5;
const ZOOM_PASO = 0.1;

// Mide el tamaño disponible del contenedor.
function useSize(ref) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.floor(width), h: Math.floor(height) });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

// Página del modo vertical: solo se dibuja cuando está cerca de la pantalla.
function PaginaVertical({ numero, width, ratio, rootRef }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { root: rootRef.current, rootMargin: "900px 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [rootRef]);

  return (
    <div ref={ref} className="pdf-page" style={{ width, height: width / ratio }}>
      {visible && (
        <Page
          pageNumber={numero}
          width={width}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      )}
    </div>
  );
}

// modo: "libro" (horizontal, páginas enfrentadas) o "vertical" (scroll continuo)
function PdfViewer({ file, modo }) {
  const stageRef = useRef(null);
  const size = useSize(stageRef);

  const [numPages, setNumPages] = useState(0);
  const [ratio, setRatio] = useState(0.707); // ancho / alto (A4 por defecto)
  const [pagina, setPagina] = useState(1);
  const [zoom, setZoom] = useState(1);

  const cambiarZoom = (delta) =>
    setZoom((z) =>
      Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round((z + delta) * 10) / 10))
    );

  const onLoadSuccess = async (pdf) => {
    setNumPages(pdf.numPages);
    const p = await pdf.getPage(1);
    const [x0, y0, x1, y1] = p.view;
    setRatio((x1 - x0) / (y1 - y0));
  };

  // En pantallas anchas se muestran dos páginas; en celular, una.
  const dos = size.w >= 700;

  // La portada va sola (a la derecha), después de a pares: [2,3], [4,5]...
  const vistas = useMemo(() => {
    if (!numPages) return [];
    const v = [[1]];
    if (dos) {
      for (let p = 2; p <= numPages; p += 2) {
        v.push(p + 1 <= numPages ? [p, p + 1] : [p]);
      }
    } else {
      for (let p = 2; p <= numPages; p++) v.push([p]);
    }
    return v;
  }, [numPages, dos]);

  const idx = Math.max(0, vistas.findIndex((v) => v.includes(pagina)));
  const vista = vistas[idx] || [];

  const ir = useCallback(
    (delta) => {
      const destino = vistas[idx + delta];
      if (destino) setPagina(destino[0]);
    },
    [vistas, idx]
  );

  // Flechas del teclado en modo libro.
  useEffect(() => {
    if (modo !== "libro") return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") ir(1);
      if (e.key === "ArrowLeft") ir(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modo, ir]);

  // Tamaños
  const altoLibro =
    Math.min(size.h - 24, ((dos ? size.w / 2 : size.w) - 24) / ratio) * zoom;
  const anchoLibro = Math.max(0, Math.floor(altoLibro * ratio));
  const anchoVertical = Math.max(0, Math.floor(Math.min(size.w - 32, 900) * zoom));

  const renderLibro = () => {
    if (!anchoLibro || !vista.length) return null;

    const hueco = <div className="pdf-hueco" style={{ width: anchoLibro }} />;
    const pagina_ = (n) => (
      <div className="pdf-page" style={{ width: anchoLibro }}>
        <Page
          pageNumber={n}
          width={anchoLibro}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </div>
    );

    if (!dos) return <div className="pdf-book">{pagina_(vista[0])}</div>;

    const esPortada = vista[0] === 1;
    return (
      <div className="pdf-book">
        {esPortada ? hueco : pagina_(vista[0])}
        {esPortada ? pagina_(vista[0]) : vista[1] ? pagina_(vista[1]) : hueco}
      </div>
    );
  };

  const textoPagina =
    vista.length === 2 ? `${vista[0]}–${vista[1]}` : vista[0] || "";

  return (
    <div className="pdf-viewer">
      <div className="pdf-stage-wrap">
        <div
          ref={stageRef}
          className={`pdf-stage ${modo === "libro" ? "pdf-stage-libro" : "pdf-stage-vertical"}`}
        >
          {size.w > 0 && (
            <Document
              file={file}
              onLoadSuccess={onLoadSuccess}
              loading={<p className="pdf-msg mono">CARGANDO LIBRO…</p>}
              error={<p className="pdf-msg mono">NO SE PUDO CARGAR EL PDF</p>}
            >
              {modo === "libro" && renderLibro()}

              {modo === "vertical" &&
                numPages > 0 &&
                Array.from({ length: numPages }, (_, i) => (
                  <PaginaVertical
                    key={i + 1}
                    numero={i + 1}
                    width={anchoVertical}
                    ratio={ratio}
                    rootRef={stageRef}
                  />
                ))}
            </Document>
          )}
        </div>

        {modo === "libro" && numPages > 0 && (
          <>
            <button
              className="pdf-arrow pdf-arrow-left"
              onClick={() => ir(-1)}
              disabled={idx === 0}
              aria-label="Página anterior"
            >
              ‹
            </button>
            <button
              className="pdf-arrow pdf-arrow-right"
              onClick={() => ir(1)}
              disabled={idx >= vistas.length - 1}
              aria-label="Página siguiente"
            >
              ›
            </button>
          </>
        )}
      </div>

      <div className="pdf-status mono">
        <div className="pdf-zoom">
          <span className="pdf-zoom-label">TAMAÑO</span>
          <button
            onClick={() => cambiarZoom(-ZOOM_PASO)}
            disabled={zoom <= ZOOM_MIN}
            aria-label="Reducir tamaño"
          >
            −
          </button>
          <span className="pdf-zoom-value">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => cambiarZoom(ZOOM_PASO)}
            disabled={zoom >= ZOOM_MAX}
            aria-label="Aumentar tamaño"
          >
            +
          </button>
          <button
            className="pdf-zoom-reset"
            onClick={() => setZoom(1)}
            disabled={zoom === 1}
          >
            AJUSTAR
          </button>
        </div>

        <div className="pdf-status-page">
          {modo === "libro" && numPages > 0 ? `PÁGINA ${textoPagina} / ${numPages}` : ""}
        </div>
      </div>
    </div>
  );
}

export default PdfViewer;