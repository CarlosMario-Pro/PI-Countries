const { Country } = require('../db');
const axios = require('axios');


const getApiInfo = async() => {
        const apiUrl = await axios.get("https://restcountries.com/v3/all");
        const apiInfo = await apiUrl.data.map(el => {
            return {
                id: el.cca3,
                name: el.name.common,
                flag: el.flags[1],
                continent: el.region,
                capital: el.capital != null ? el.capital[0] : "Not found Capital",
                subregion: el.subregion ? el.subregion : "Not found Subregion",
                area: el.area,
                population: el.population,
                maps: el.maps.openStreetMaps
            };
        });
      
        await apiInfo.map((elements) => {
            Country.findOrCreate({
                where: {
                    id: elements.id,
                    name: elements.name,
                    flag: elements.flag,
                    continent: elements.continent,
                    capital: elements.capital,
                    subregion: elements.subregion,     
                    area: elements.area,
                    population: elements.population,
                    maps: elements.maps
                }
            });
        });
        console.log('Info guardada con éxito');
};


module.exports = {
  getApiInfo
}