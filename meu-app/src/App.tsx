
import { useState } from 'react';
import './App.css'

function App() {
  const [conta , setcontador] = useState<number>(  90 );


   return (
  <>
    <div>
      João Eduardo Konzen De Oliviera
      <div>contador:{conta}</div>
    </div>
    <div><button onClick={()=> setcontador(conta - 1)}>
      -contador
    </button>
    </div>
    <div><button onClick={()=> setcontador(conta + 1)}>
      +contador
    </button>
    </div>

    <div>
      Hello World
    </div>
    
  </>
  )
}

export default App
