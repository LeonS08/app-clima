import React, { useState } from 'react'
import FormularioClima from './componentes/FormularioClima'
import MostrarClima from './componentes/MostrarClima'
import './App.css'

function App() {
  const [datosClima, setDatosClima] = useState(null)

  return (
    <div className="App">
      <h1>Aplicación de Clima</h1>
      <FormularioClima setDatosClima={setDatosClima} />
      <MostrarClima datosClima={datosClima} />
    </div>
  )
}

export default App
