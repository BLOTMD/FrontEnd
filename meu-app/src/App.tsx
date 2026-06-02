
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/public/login/Login';
import Cadastro from './pages/public/register/Cadastro';

function App() {


   return (
  <>
  <div>

    <Routes>
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/" element={<Login />} />
    </Routes>

    </div>

  </>
  )
}

export default App
