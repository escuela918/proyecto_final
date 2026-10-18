import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Lector from "./pages/Lector";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/leer/:id" element={<Lector />} />
    </Routes>
  );
}

export default App;