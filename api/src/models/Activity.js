const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.ENUM('1', '2', '3', '4', '5'),
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    season: {
      allowNull: false,
      type: DataTypes.ENUM(
        "Summer",
        "Autumn",
        "Winter",
        "Spring",
        ),
    },
  }, {timestamps: false});
};