const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Car Rentals API funcionando');
});

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});

//Ruta de Vehiculos
const vehiculoRoutes = require('./Routes/VehiculoRoutes');
app.use('/api/vehiculos', vehiculoRoutes);

//Ruta de Seguros
const seguroRoutes = require('./Routes/SeguroRoutes');
app.use('/api/seguros',seguroRoutes);

//Ruta de Equipamientos
const equipamientoRoutes = require('./Routes/EquipamientoRoutes');
app.use('/api/equipamientos',equipamientoRoutes);

//Ruta de Ubicaciones
const ubicacionRoutes=require('./Routes/UbicacionRoutes');
app.use('/api/ubicaciones',ubicacionRoutes)

//Ruta de Reservas
const reservaRoutes=require('./Routes/ReservaRoutes');
app.use('/api/reservas',reservaRoutes);