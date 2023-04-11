'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Generos extends Model {
    
    static associate(models) {
      // define association here
      Generos.hasMany(models.Libros,{
        as:"libros",
        foreignKey: "generoId",
        onDelete: "CASCADE"
      })
    }
  }
  Generos.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Generos',
  },{timestamps: false});
  return Generos;
};