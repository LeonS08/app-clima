import React from 'react'

const MostrarClima = ({ datosClima }) => {
  return (
    <div className="weather-display">
      {datosClima ? (
        <div>
          <h2>{datosClima.name}</h2>
          <p>{datosClima.weather[0].description}</p>
          <p>{datosClima.main.temp}°C</p>
        </div>
      ) : (
        <p>No hay datos del clima</p>
      )}
    </div>
  )
}

export default MostrarClima
