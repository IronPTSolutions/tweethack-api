require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Base de datos

require('./config/db.config');

// Creamos la instancia de la app

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());
app.use(logger('dev'));

// Rutas

const routes = require('./config/routes.config');
app.use('/api', routes);

// Arranque del servidor

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App started on port: ${PORT} 🚀`);
})