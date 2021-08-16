/* 
    SINTÁXIS ANTIGUA CON COMMONJS
    const express = require('express');

    Para agregar el soporte nativo a módules es necesario 
    agregar la bandera "type": "module" al package.json
*/
   
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import router from './routes/index.js';
import db from './config/db.js';

dotenv.config({ path: 'variables.env' });

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Conectar base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch( error => console.error(error));

// Definir host y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

// Definir path de views
app.set('views', path.join(__dirname, 'views'));

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener año actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.siteName = 'Agencia de Viajes'
    next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

// Definir carpeta pública
app.use(express.static('public'));

// Agregar router
app.use('/', router);

// Encender servicio
app.listen(port, host, () => {
    console.log(`El servidor está corriendo en ${port}`);
});