import React, { useState } from 'react'
import axios from 'axios'

const FormularioClima = ({ setDatosClima }) => {
  const [ciudad, setCiudad] = useState('')

  const obtenerClima = async (e) => {
    e.preventDefault()
    try {
      const respuesta = await axios.get(`http://localhost:5000/api/clima?ciudad=${ciudad}`)
      console.log('Datos del clima recibidos:', respuesta.data)
      setDatosClima(respuesta.data)
      setCiudad('')
    } catch (error) {
      if (error.response) {
        console.error('Error en la respuesta del servidor:', error.response.data)
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request)
      } else {
        console.error('Error al configurar la solicitud:', error.message)
      }
    }
  }

  return (
    <form onSubmit={obtenerClima}>
      <input
        type="text"
        value={ciudad}
        onChange={(e) => setCiudad(e.target.value)}
        placeholder="Ingrese la ciudad"
      />
      <button type="submit">Obtener Clima</button>
    </form>
  )
}

export default FormularioClima
