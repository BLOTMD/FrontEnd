
import './App.css'
import  Login from './pages/public/login/Login';
import LogoEasyPc from './pages/public/Images/LogoEasyPc.png';

function App() {


   return (
  <>  
    <div className='Logo'>

      <image src='src/pages/public/Images/LogoEasyPc.png'></image>

    </div>
    
    <div className='senhaelogin'>

      Usuario<p></p>

      <input type="text" placeholder='Digite seu nome'></input>

    </div>
    <div className='senhaelogin'>

    Senha<p></p>

    <input type="text" placeholder='Digite sua senha'></input>

    </div>
  

    <Login></Login>
  </>
  )
}

export default App
