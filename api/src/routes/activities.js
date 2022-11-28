const { Router } = require('express');
const { Country, Activity } = require('../db');
const router = Router();


router.post('/', async (req, res) => {                                      //Ruta para crear la actividad
    const { nameCountry, name, duration, season, difficulty } = req.body;   //El 'nameCountry' será el país al que se le crea la actividad turística
    try{        
        const newActivity = await Activity.create({                         //Creo la actividad turistica en 'Activity' 
            name, 
            difficulty, 
            duration, 
            season
        });

        //De esta forma busco en la DB el name del país dado por body
        const countryDb = await Country.findAll({                           //Busco en DB tabla 'Country' todo    
            where:{                                                         //Donde
                name: nameCountry                                           //El 'name' de 'Country' sea igual al 'nameCountry' de params
            }
        });

        //De esta forma uno la actividad turística con el país
        await newActivity.addCountry(countryDb);                            //Y relaciono la actividad turística con el país que coincide con 'countryDb'
        return res.send(`Tu actividad turística "${ name }" se creo exitosamente.`);
    }catch(error){
         return res.send("Tu actividad turística no se pudo crear.");
    }
});//FUNCIONA, En Postgres lo hice así: { "nameCountry": "Colombia", "name": "Montañismo", "difficulty": "4", "duration": "3 horas", "season": "Winter" }



router.get('/', async (req, res) =>{                                        //Ruta para consultar las actividades
    try{
        const allActivities = await Activity.findAll({include: {            //Busco las actividades turísticas creadas para cada país en DB tabla 'Activity'
            model: Country                                                  //E incluyo el model 'Country'
        }});
        res.send(allActivities);
    }
    catch(e){
        res.send(`Este es el error de get activities por: (${e})`);
    }
});//FUNCIONA, CONSULTAR LA ACTIVIDAD EN LA DB --> SELECT * FROM "Activities";


module.exports = router;