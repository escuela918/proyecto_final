import "../styles/navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <a href="#inicio" className="navbar-logo">
        <span className="logo-symbol">◉</span>
        <span>BORGES</span>
      </a>

      <nav className="navbar-links">

        <a href="#inicio">
          <span>01</span>
          Inicio
        </a>

        <a href="#aleph">
          <span>02</span>
          El Aleph
        </a>

        <a href="#borges">
          <span>03</span>
          Borges
        </a>

        <a href="#obras">
          <span>04</span>
          Obras
        </a>

      </nav>

      <div className="navbar-status">
        <span></span>
        INFINITO
      </div>

    </header>
  );
}

export default Navbar;