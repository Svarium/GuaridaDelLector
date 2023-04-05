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
      editorialId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model : {
          tableName:"Editoriales"
        },
        key:"id"
      }
        
      },
      video: {
        type: Sequelize.STRING
      },
      paginas: {
        type: Sequelize.INTEGER
      },
      description1: {
        type: Sequelize.STRING(2000)
      },
      description2: {
        type: Sequelize.STRING(5000)
      },
      imagen: {
        type: Sequelize.STRING
      },
      autorId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model : {
          tableName:"Autores"
        },
        key:"id"
      }
        
      },
      generoId: {
        type: Sequelize.INTEGER,
        allowNull:false,
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