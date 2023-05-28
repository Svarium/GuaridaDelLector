'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.belongsTo(models.Roles, {
        as: "rol",
        foreignKey: "rolId"
      })

      Usuario.hasMany(models.Order,{
        foreignKey:'userId',
        as:'orders'
      })


    }
  }
  Usuario.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    pass: DataTypes.STRING,
    icon: DataTypes.STRING,
    socialId: DataTypes.STRING,
    socialProvider: DataTypes.STRING,
    rolId: {type : DataTypes.INTEGER, defaultValue:2}
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};