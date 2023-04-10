'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Editoriales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Editoriales.hasMany(models.Libros,{
        as:"libros",
        foreignKey: "editorialId"
      })
    }
  }
  Editoriales.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Editoriales',
  },{timestamps: false});
  return Editoriales;
};