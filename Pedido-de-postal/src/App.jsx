import CirculoPedido from "./components/CirculoPedido.jsx";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <h1>Bochapostales Borgianas</h1>
        <p className="subtitulo">Pedido de postal</p>
      </header>

      <main>
        <CirculoPedido />
      </main>
    </>
  );
}

export default App;
