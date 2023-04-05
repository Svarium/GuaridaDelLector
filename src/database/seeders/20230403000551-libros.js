'use strict';

let productos = require("../../data/books.json")

let libros = productos.map(producto => {
  let libro = {
      titulo: producto.titulo ,
      precio: producto.precio,
      editorial: producto.editorial,
      video: producto.video,
      paginas: producto.paginas,
      description1: producto.description1,
      description2: producto.description2,
      imagen: producto.imagen,
      autorId: producto.autorId,
      generoId: producto.generoId,
      createdAt: new Date,
      updatedAt: new Date
      
  }
  return libro
})

module.exports = {
  async up (queryInterface, Sequelize) { 
    await queryInterface.bulkInsert("Libros", libros, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Libros", null, {})
  }
};
