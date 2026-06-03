
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/public/login/Login';
import Cadastro from './pages/public/register/Cadastro';
import Home from './pages/public/home/Home';
function App() {


   return (
  <>
  <div>

    <Routes>
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>

    </div>

  </>
  )
}

export default App
