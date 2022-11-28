const { Router } = require('express');
const { Country, Activity } = require('../db');
const { Op } = require('sequelize');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countriesRoutes = require('./countries.js');      //Requiero lo que está en './countries.js' para asignar la ruta
const activitiesRoutes = require('./activities.js');    //Requiero lo que está en './activities.js' para asignar la ruta


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countriesRoutes);
router.use('/activities', activitiesRoutes);

module.exports = router;