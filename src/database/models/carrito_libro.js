'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carrito_libro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Carrito_libro.init({
    cantidad: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    libroId: DataTypes.INTEGER,
    carritoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Carrito_libro',
  });
  return Carrito_libro;
};