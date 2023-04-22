'use strict';
let listaDeUsuarios = require('../../data/users.json')

let usuarios = listaDeUsuarios.map(usuario => {
  let elemento = {
  id: usuario.id,
  name: usuario.name,
  surname: usuario.surname,
  email: usuario.email,
  pass: usuario.password,
  icon: usuario.icon,
  rolid: usuario.rol === 'admin' ? 1 : 2,
  createdAt: new Date,
  updatedAt: new Date
}
return elemento
})

module.exports = {
async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Usuarios', usuarios , {})
  },

async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null , {})
  }
};
