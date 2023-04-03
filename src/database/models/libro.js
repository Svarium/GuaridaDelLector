'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Libro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Libro.init({
    titulo: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    editorial: DataTypes.STRING,
    video: DataTypes.STRING,
    paginas: DataTypes.INTEGER,
    description: DataTypes.STRING,
    imagen: DataTypes.STRING,
    autorId: DataTypes.INTEGER,
    generoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Libro',
  });
  return Libro;
};