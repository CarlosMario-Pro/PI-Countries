const { Router } = require('express');
const { Country, Activity } = require('../db');
const { Op } = require('sequelize');
const router = Router();
const { getApiInfo } = require('../controller/index');



router.get('/', async (req, res) => {                               //Ruta para traer países por query
    const allInfoCountries = await getApiInfo();                    //Guardo en variable la fn que hace el llamado a la API
    const country = await Country.findAll();                        //Busco y traigo todos los países de 'Country'
    const name = req.query.name;                                    //Tomo por query el nombre

    const countryForName = await Country.findAll({                  //Buscamos en la DB tabla 'Country' todo
        where: {                                                    //Donde
            name: {                                                 //El 'name' de 'Country' 
            [Op.iLike]: `%${name}%`                                 //Coincida en alguna fracción con el 'name' pasado por query
          },
        },
        include: Activity                                           //Y le incluyo las actividades creadas en tabla 'Activity'
    });

    try{
        if(name){                                                   //Si hay 'name' por query
            countryForName.length?                                  //Y a su vez si hay países con actividades
            res.status(200).json(countryForName):                   //Respondo con esos países con actividades
            res.status(404).send(`No se encontro el pais ${name}`);
        }
        else{
            res.send(country);                                      //Si no hay, responder con la fn que trae todos los países
        }
    } catch(error){
        res.status(400).send('No se logró traer la lista de países.');
    }
});//FUNCIONA




router.get('/:id', async (req, res) => {                            //Ruta para consultar los países por ID
    const id = req.params.id.toUpperCase();                         //Tomo el id del país enviado por params y lo convierto a minúsculas
    try{
        const countryForId = await Country.findByPk(id, {           //Traigo todo de 'Country' si su PK es igual al 'id' de params
        include: {                                                  //Y le incluyo 
                model: Activity                                     //El model 'Activity'
            }
        });
        return res.json(countryForId);
    }catch(error){
        res.status(400).send(error);
    }
});


module.exports = router;