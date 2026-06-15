import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/public/login/Login";
import Cadastro from "./pages/public/register/Cadastro";
import Home from "./pages/public/home/Home";
import MainLayout from "./layout/mainLayout";
import Loja from "./loja/Loja";
import Comparacao from "./pages/sideBarAbas/Comparacao";
import Carrinho from "./pages/sideBarAbas/Carrinho";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route element={<MainLayout />}>
        <Route path="/loja" element={<Loja />} />
        <Route path="/comparacao" element={<Comparacao />} />
        <Route path="/carrinho" element={<Carrinho />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
