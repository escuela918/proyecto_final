import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import Navbar from "../components/Navbar";
import Aleph from "../components/Aleph";
import obras from "../components/biblioteca";

const SCROLL_KEY = "home-scroll-y";

function Home() {
  const navigate = useNavigate();

  // Restaura la posición del scroll al volver con el botón "atrás".
  // Si no hay posición guardada, se muestra la página principal desde arriba.
  useEffect(() => {
    const guardado = sessionStorage.getItem(SCROLL_KEY);

    if (guardado !== null) {
      const y = parseInt(guardado, 10);
      requestAnimationFrame(() => {
        window.scrollTo({ top: y, left: 0, behavior: "instant" });
      });
      sessionStorage.removeItem(SCROLL_KEY);
    }
  }, []);

  // Abre el PDF dentro de la app (página /leer/:id), guardando antes la posición actual.
  const abrirLibro = (id) => {
    const libro = obras[id];

    if (!libro || !libro.pdf) {
      console.error(`No se encontró el libro o su PDF: ${id}`);
      return;
    }

    sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    navigate(`/leer/${id}`);
  };

  return (
    <div className="home">
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-background">
          <img src="/images/borges-hero.jpeg" alt="Jorge Luis Borges" />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-grid"></div>

        <div className="hero-content">
          <div className="hero-index mono">ARCHIVE / 0001</div>
          <div className="hero-small mono">JORGE LUIS BORGES</div>
          <h1 className="hero-title serif">El Aleph</h1>
          <p className="hero-subtitle">Un punto que contiene todos los puntos.</p>
          <div className="hero-description">
            <span className="mono">BUENOS AIRES</span>
            <span>·</span>
            <span className="mono">1949</span>
            <span>·</span>
            <span className="mono">ARCHIVO LITERARIO</span>
          </div>
        </div>

        <div className="hero-aleph"><Aleph /></div>
        <div className="hero-coordinates mono">
          <span>34°36′13″S</span>
          <span>58°22′54″W</span>
        </div>
        <div className="scroll-indicator">
          <span className="mono">SCROLL TO EXPLORE</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* INTRODUCCIÓN */}
      <section className="intro-section">
        <div className="container">
          <div className="section-label mono"><span>01</span> THE ARCHIVE</div>
          <div className="intro-grid">
            <div className="intro-title">
              <p className="mono">EL UNIVERSO</p>
              <h2 className="serif">Una totalidad<br />contenida en<br />un punto.</h2>
            </div>
            <div className="intro-text">
              <p>En el relato de Jorge Luis Borges, el Aleph es un punto del espacio que contiene todos los puntos.</p>
              <p>Desde allí puede contemplarse simultáneamente todo lo que existe: lugares, personas, tiempos, objetos y acontecimientos.</p>
              <div className="data-line"><span className="mono">OBJECT</span><span>THE ALEPH</span></div>
              <div className="data-line"><span className="mono">AUTHOR</span><span>JORGE LUIS BORGES</span></div>
              <div className="data-line"><span className="mono">YEAR</span><span>1949</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ALEPH */}
      <section className="aleph-section">
        <div className="aleph-section-background"></div>
        <div className="container">
          <div className="section-label mono"><span>02</span> OBJECT ANALYSIS</div>
          <div className="aleph-layout">
            <div className="aleph-info">
              <div className="technical-number mono">01 / 01</div>
              <h2 className="serif">El punto<br />infinito.</h2>
              <p>Un objeto imposible de representar completamente. Una esfera diminuta capaz de contener la totalidad del universo.</p>
              <div className="technical-box">
                <div><span className="mono">TYPE</span><strong>INFINITE POINT</strong></div>
                <div><span className="mono">STATE</span><strong>ACTIVE</strong></div>
                <div><span className="mono">DIMENSION</span><strong>∞</strong></div>
              </div>
            </div>
            <div className="aleph-viewer">
              <div className="viewer-corner top-left"></div>
              <div className="viewer-corner top-right"></div>
              <div className="viewer-corner bottom-left"></div>
              <div className="viewer-corner bottom-right"></div>
              <Aleph />
              <div className="viewer-label mono">OBJECT_SCAN / ALEPH_01</div>
            </div>
          </div>
        </div>
      </section>

      {/* BORGES */}
      <section className="borges-section">
        <div className="container">
          <div className="section-label mono"><span>03</span> THE AUTHOR</div>
          <div className="borges-grid">
            <div className="borges-image">
              <div className="image-frame">
                <img src="/images/borges-retrato.jpeg" alt="Jorge Luis Borges" />
                <div className="image-scan"></div>
                <div className="image-code mono">BORGES / 1899—1986</div>
              </div>
            </div>
            <div className="borges-content">
              <span className="mono">JORGE LUIS BORGES</span>
              <h2 className="serif">El hombre<br />detrás del<br />laberinto.</h2>
              <p>Escritor, poeta, ensayista y bibliotecario argentino. Su obra explora los laberintos, los espejos, el tiempo, los sueños y la naturaleza infinita de la literatura.</p>
              <p>Borges convirtió ideas filosóficas y metafísicas en relatos donde la realidad parece abrirse hacia otras realidades.</p>
              <div className="author-data">
                <div><span className="mono">BORN</span><strong>1899</strong></div>
                <div><span className="mono">DIED</span><strong>1986</strong></div>
                <div><span className="mono">ORIGIN</span><strong>BUENOS AIRES</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUENOS AIRES */}
      <section className="buenos-aires-section">
        <div className="buenos-aires-image"><img src="/images/buenos-aires.jpeg" alt="Buenos Aires histórica" /></div>
        <div className="buenos-aires-overlay"></div>
        <div className="container buenos-aires-content">
          <div className="section-label mono"><span>04</span> BUENOS AIRES</div>
          <div className="location-content">
            <span className="mono">LOCATION / ARGENTINA</span>
            <h2 className="serif">La ciudad<br />de los laberintos.</h2>
            <p>Buenos Aires aparece constantemente en la obra de Borges. Sus calles, barrios, bibliotecas y casas forman parte del universo literario que construyó durante décadas.</p>
          </div>
          <div className="location-coordinates mono"><span>34°36′13″S</span><span>58°22′54″W</span></div>
        </div>
      </section>

      {/* CASA DEL ALEPH */}
      <section className="casa-section">
        <div className="container">
          <div className="section-label mono"><span>05</span> LOCATION ARCHIVE</div>
          <div className="casa-grid">
            <div className="casa-content">
              <span className="mono">CALLE GARAY</span>
              <h2 className="serif">El lugar<br />donde todo<br />existe.</h2>
              <p>En el relato, Carlos Argentino Daneri lleva a Borges hasta el sótano de una antigua casa de Buenos Aires.</p>
              <p>Allí, debajo de la escalera, se encuentra el Aleph.</p>
            </div>
            <div className="casa-image">
              <img src="/images/casa-aleph.jpeg" alt="Casa relacionada con El Aleph" />
              <div className="casa-overlay mono">ARCHIVE_IMAGE / 05</div>
            </div>
          </div>
        </div>
      </section>

      {/* MANUSCRITO */}
      <section className="manuscript-section">
        <div className="container">
          <div className="section-label mono"><span>06</span> ORIGINAL TEXT</div>
          <div className="manuscript-grid">
            <div className="manuscript-image">
              <img src="/images/manuscrito.jpeg" alt="Manuscrito de Jorge Luis Borges" />
              <div className="manuscript-grid-overlay"></div>
            </div>
            <div className="manuscript-content">
              <span className="mono">DOCUMENT / ORIGINAL</span>
              <h2 className="serif">La literatura<br />como archivo<br />del infinito.</h2>
              <p>Los manuscritos conservan una dimensión diferente de la obra terminada: tachaduras, correcciones, palabras reemplazadas y decisiones que quedaron ocultas en la versión publicada.</p>
              <div className="document-status mono"><span className="status-dot"></span> DIGITAL ARCHIVE</div>
            </div>
          </div>
        </div>
      </section>

      {/* OBRAS */}
      <section className="works-section">
        <div className="container">
          <div className="section-label mono"><span>07</span> SELECTED WORKS</div>
          <div className="works-header">
            <h2 className="serif">El universo<br />escrito.</h2>
            <p>Algunas de las obras fundamentales para entrar en el universo literario de Borges.</p>
          </div>

          <div className="works-grid">
            <article className="work-card clickable-work" onClick={() => abrirLibro("ficciones")} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrirLibro("ficciones"); } }}>
              <div className="work-image"><img src="/images/ficciones.jpeg" alt="Ficciones" /><div className="work-open-overlay"><span className="mono">ABRIR LIBRO →</span></div></div>
              <div className="work-number mono">001</div>
              <div className="work-info"><span className="mono">1944</span><h3 className="serif">Ficciones</h3><p>Relatos sobre bibliotecas infinitas, laberintos y mundos posibles.</p></div>
            </article>

            <article className="work-card clickable-work" onClick={() => abrirLibro("aleph")} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrirLibro("aleph"); } }}>
              <div className="work-image"><img src="/images/el-aleph.jpeg" alt="El Aleph" /><div className="work-open-overlay"><span className="mono">ABRIR LIBRO →</span></div></div>
              <div className="work-number mono">002</div>
              <div className="work-info"><span className="mono">1949</span><h3 className="serif">El Aleph</h3><p>Una colección de relatos donde el infinito aparece escondido dentro de lo cotidiano.</p></div>
            </article>

            <article className="work-card clickable-work" onClick={() => abrirLibro("libroArena")} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrirLibro("libroArena"); } }}>
              <div className="work-image"><img src="/images/libro-de-arena.jpeg" alt="El libro de arena" /><div className="work-open-overlay"><span className="mono">ABRIR LIBRO →</span></div></div>
              <div className="work-number mono">003</div>
              <div className="work-info"><span className="mono">1975</span><h3 className="serif">El libro de arena</h3><p>Un libro infinito cuyas páginas no tienen principio ni final.</p></div>
            </article>

            <article className="work-card clickable-work" onClick={() => abrirLibro("bibliotecaBabel")} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrirLibro("bibliotecaBabel"); } }}>
              <div className="work-image"><img src="/images/biblioteca-babel.jpeg" alt="La biblioteca de Babel" /><div className="work-open-overlay"><span className="mono">ABRIR LIBRO →</span></div></div>
              <div className="work-number mono">004</div>
              <div className="work-info"><span className="mono">ARCHIVE</span><h3 className="serif">La biblioteca de Babel</h3><p>Una biblioteca que contiene todas las combinaciones posibles de símbolos.</p></div>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="final-section">
        <div className="final-glow"></div>
        <div className="final-content">
          <span className="mono">ARCHIVE COMPLETE</span>
          <div className="final-symbol">∞</div>
          <h2 className="serif">El infinito<br />está en todas partes.</h2>
          <p>Solo necesitamos encontrar el punto desde donde podamos verlo.</p>
          <div className="final-line"></div>
          <span className="mono final-code">BORGES / ALEPH / 1949</span>
        </div>
      </section>
    </div>
  );
}

export default Home;