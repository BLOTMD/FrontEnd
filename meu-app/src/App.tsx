<<<<<<< HEAD

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

=======
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



>>>>>>> 47dad46b184a97dca7bee4e62e19e63289551479
    </div>

  </>
  )
}

export default App
