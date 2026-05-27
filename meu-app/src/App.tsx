import { Routes } from 'react-router-dom'
import './App.css'
import Cadastro from './pages/public/register/Cadastro'
import Login from './pages/public/login/Login'
import { Route } from 'react-router-dom'


function App() {

  return (
    <div>
      <Routes>

        <Route path="/Login" element={<Login/>} />
        <Route path="/Cadastro" element={<Cadastro/>} />
  


      </Routes>



    </div>
  )
}

export default App