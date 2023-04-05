'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Autores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Autores.hasMany(models.Libros,{
        as:"libros",
        foreignKey: "autorId"
      })
    }
  }
  Autores.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Autores',
  },{timestamps: false});
  return Autores;
};