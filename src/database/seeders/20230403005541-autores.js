'use strict';

let listadoDeAutores = ["Gabriel Garcia Marquez", "Bram Stoker", "Stephen King", "J.R.R. Tolkien", "George Orwell", "H.p. Lovecraft", "Lewis Carrol", "Roald Dahl", "Patrick Rothfuss", "frank L. Baum", "Antoine de Sain Exupery", "J.K. Rowling", "Mark Twain", "P.L. Travers", "Kip's Thorne", "James Gleick", "Charles Darwin", "Michuo Kaku", "Doglas R. Hofstadter", "Stephen W. Hawking", "Juan J. Millas y Juan L. Arsuaga", "Bill Bryson", "Erik Larsen", "Tatsuki Fujimoto", "Koyoharu Gotouge", "Akira Toriyama", "Bendis Marquez Pondor", "Gege Akutami", "Ed Mcguines y joe Kelly", "dan slott", "Dolores Redondo", "Manuel Loireiro",  "Isabel Allende",  "Boichi"]

/* for (let i = 0; i < listadoDeAutores.length; i++) {

   console.log(i+1 + " " + listadoDeAutores[i])

  } 
*/

/* 

  Si bien empezamos a iterar de cero una vez poblada la base de datos la iteracion es a partir de 1

  1 Gabriel Garcia Marquez
  2 Bram Stoker
  3 Stephen King
  4 J.R.R. Tolkien
  5 George Orwell
  6 H.p. Lovecraft
  7 Lewis Carrol
  8 Roald Dahl
  9 Patrick Rothfuss
  10 frank L. Baum
  11 Antoine de Sain Exupery
  12 J.K. Rowling
  13 Mark Twain
  14 P.L. Travers
  15 Kip's Thorne
  16 James Gleick
  17 Charles Darwin
  18 Michuo Kaku
  19 Doglas R. Hofstadter
  20 Stephen W. Hawking
  21 Juan J. Millas y Juan L. Arsuaga
  22 Bill Bryson
  23 Erik Larsen
  24 Tatsuki Fujimoto
  25 Koyoharu Gotouge
  26 Akira Toriyama
  27 Bendis Marquez Pondor
  28 Gege Akutami
  29 Ed Mcguines y joe Kelly
  30 dan slott
  31 Dolores Redondo
  32 Manuel Loireiro
  33 Isabel Allende
  34 Boichi

*/

let autores = listadoDeAutores.map(autor=>{
  let persona = {
    nombre : autor,
    createdAt: new Date,
    updatedAt: new Date
  }
  return persona
})


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Autores", autores, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Autores", null, {})
  }
};
