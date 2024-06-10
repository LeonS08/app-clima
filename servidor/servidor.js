const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PUERTO = process.env.PORT || 5000
const CLIMA_API_KEY = process.env.CLIMA_API_KEY
const MONGO_URI = process.env.MONGO_URI

app.use(cors())
app.use(express.json())

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Conectado a MongoDB")
}).catch((error) => {
  console.error("Error al conectar a MongoDB:", error)
});

const esquemaBusqueda = new mongoose.Schema({
  ciudad: String,
  fecha: { type: Date, default: Date.now },
})

const Busqueda = mongoose.model('Busqueda', esquemaBusqueda)

app.get('/api/clima', async (req, res) => {
  const ciudad = req.query.ciudad;
  if (!ciudad) {
    return res.status(400).json({ error: 'Debe proporcionar una ciudad' })
  }

  try {
    const respuesta = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${CLIMA_API_KEY}&units=metric`
    )
    const datosClima = respuesta.data

    const nuevaBusqueda = new Busqueda({ ciudad })
    await nuevaBusqueda.save()

    res.json(datosClima)
  } catch (error) {
    console.error('Error al obtener los datos del clima:', error.message)
    res.status(500).json({ error: 'Error al obtener los datos del clima' })
  }
})

app.listen(PUERTO, () => {
  console.log(`El servidor está corriendo en el puerto ${PUERTO}`)
})
