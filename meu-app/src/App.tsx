
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/public/login/Login';
import Cadastro from './pages/public/register/Cadastro';
import Home from './pages/public/home/Home';
import Loja from './loja/Loja';
function App() {


   return (
  <>
  <div>

    <Routes>
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/loja" element={<Loja />} />
    </Routes>

    </div>

  </>
  )
}

export default App
