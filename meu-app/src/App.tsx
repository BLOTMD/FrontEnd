
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/public/login/Login';
import Cadastro from './pages/public/register/Cadastro';
import Home from './pages/public/Home/Home';
import MainLayout from "./layouts/MainLayout";

import carrinho from './pages/public/carrinho/carrinho';
import comparacao from './pages/public/comparacao/comparacao';
import loja from './pages/public/loja/loja';

function App() {


   return (
  <>
  <div>

    <Routes>
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route element={<MainLayout />}>
          <Route path="/loja" element={<loja />} />
          <Route path="/comparacao" element={<comparacao />} />
          <Route path="/carrinho" element={<carrinho />} />
      </Route>
    </Routes>

    </div>

  </>
  )
}

export default App
