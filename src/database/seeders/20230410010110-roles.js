'use strict';

let listado = ["Admin","User"]

let roles = listado.map(rol => {
  let elemento = {
    nombreRol: rol,
    createdAt: new Date,
    updatedAt: new Date
  }
  return elemento 
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert("Roles", roles, {})
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete("Roles", null, {})
  }
};
