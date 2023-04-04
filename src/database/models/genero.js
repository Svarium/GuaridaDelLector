'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Libros.belongsTo(models.Generos,{
        as:"genero",
        foreignKey: "generoId"
      })
      Libros.belongsTo(models.Generos,{
        as:"genero",
        foreignKey: "generoId"
      })
    }
  }
  Genero.init({
    nombre: DataTypes.STRING,
    ranking: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Genero',
  });
  return Genero;
};