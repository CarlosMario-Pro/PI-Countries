const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    flag: {
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue: 'https://elordenmundial.com/wp-content/uploads/2019/12/Captura-de-pantalla-2019-12-04-a-las-12.43.10-1310x824.png'
    },
    continent: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    capital: {
      type: DataTypes.STRING,
      //allowNull:false,
    },
    subregion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.FLOAT,
      get(){                            
        const value = this.getDataValue('area');
        return value ? value + ' Kms cuadrados' : null;
      }
    },
    population:{
      type: DataTypes.INTEGER,
    },
    maps: {
      type: DataTypes.STRING,
    }
  }, { timestamps: false });
};