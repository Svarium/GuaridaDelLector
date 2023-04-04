'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Libros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.INTEGER
      },
      editorial: {
        type: Sequelize.STRING
      },
      video: {
        type: Sequelize.STRING
      },
      paginas: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      imagen: {
        type: Sequelize.STRING
      },
      autorId: {
        type: Sequelize.INTEGER,
        references:{
          model : {
          tableName:"Autors"
        },
        key:"id"
      }
        
      },
      generoId: {
        type: Sequelize.INTEGER,
        references:{
          model:{
          tableName:"Generos"
        },
        key:"id"
      }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Libros');
  }
};