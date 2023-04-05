'use strict';


let listadoDeEditoriales = [

/* 1   */ "RAE",
/* 2   */ "ALFAGUARA",
/* 3   */ "PLAZA & JANES EDITORES",
/* 4   */ "DEBOLSILLO",
/* 5   */ "MINOTAURO",
/* 6   */ "ALMA EUROPA",
/* 7   */ "PENGUIN CLASICOS",
/* 8   */ "ALMA",
/* 9   */ "ANAYA",
/* 10  */ "SALAMANDRA",
/* 11  */ "JUVENTUD",
/* 12  */ "CRITICA",
/* 13  */ "ESPASAS LIBROS",
/* 14  */ "DEBATE",
/* 15  */ "TUSQUETS",
/* 16  */ "RBA LIBROS",
/* 17  */ "MARVEL",
/* 18  */ "NORMA EDITORIAL",
/* 19  */ "PANINI MERCIS",
/* 20  */ "PLANETA DE AGOSTINI",
/* 21  */ "DESTINO",
/* 22  */ "PLANETA",
/* 23  */ "NOVA EDICIONES B",
 

]



let editoriales = listadoDeEditoriales.map(elemento=>{
  let editorial = {
    nombre : elemento,
    createdAt: new Date,  
    updatedAt: new Date
  }
  return editorial
})


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Editoriales", editoriales, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Editoriales", null, {})
  }
};