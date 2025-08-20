import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Principal from "./page/VehiculosPage";
import Reserva from "./page/ReservaPage";
import Confirmacion from "./page/Confirmacion";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/reserva" element={<Reserva />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
