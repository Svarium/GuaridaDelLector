'use strict';
const sequelizePaginate = require('sequelize-paginate')

const {
  Model, ForeignKeyConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Libros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Libros.belongsTo(models.Autores,{
        as:"autor",
        foreignKey: "autorId"
      })
      Libros.belongsTo(models.Generos,{
        as:"genero",
        foreignKey: "generoId"
      })
      Libros.belongsTo(models.Editoriales,{
        as:"editorial",
        foreignKey: "editorialId"
      })

      Libros.belongsToMany(models.Order,{
        foreignKey:'bookId',
        otherKey: 'orderId',
        through:'Cart',
        as:'cart'
      })

    }
  }
  Libros.init({
    titulo: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    editorialId: DataTypes.STRING,
    video: DataTypes.STRING,
    paginas: DataTypes.INTEGER,
    description1: DataTypes.STRING,
    description2: DataTypes.STRING,
    imagen: DataTypes.STRING,
    autorId: DataTypes.INTEGER,
    generoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Libros',
  });

  sequelizePaginate.paginate(Libros)
  return Libros;
};
