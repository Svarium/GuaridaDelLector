'use strict';

let listadoDeGeneros = [
/* 1 */"Novela Ficción",
/* 2 */"Novela Terror",
/* 3 */"Novela Fantasía",
/* 4 */"Novela",
/* 5 */"Infantil",
/* 6 */"Divulgacion Cientifica", 
/* 7 */"Comics",
/* 8 */"Manga",
/* 9 */"Novela Negra"
]

let generos = listadoDeGeneros.map(genero=>{
  let libro = {
    nombre : genero,
    createdAt: new Date,  
    updatedAt: new Date
  }
  return libro
})


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Generos", generos, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Generos", null, {})
  }
};
