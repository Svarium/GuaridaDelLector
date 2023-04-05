'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Generos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Generos.hasMany(models.Libros,{
        as:"libros",
        foreignKey: "generoId"
      })
    }
  }
  Generos.init({
    nombre: DataTypes.STRING,
    ranking: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Generos',
  },{timestamps: false});
  return Generos;
};