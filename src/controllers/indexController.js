const fs = require('fs');
const path = require('path');
const {readJSON, writeJSON} = require("../data");


const db =require('../database/models')

const productsFilePath = path.join(__dirname, '../data/books.json');
const libros = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = { 
    index:(req,res)=>{
    
     
     res.render('index', {
        libros,
      });      
    },
    admin : (req,res) =>{
      const productsFilePath = path.join(__dirname, '../data/books.json');
      const libros = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
return res.render('dashboard',{
  libros
})
    },
    listar : (req,res) => {

      db.Libros.findAll({
        attributes : ['imagen', 'precio', 'description2']
      })
      .then(libros =>{
        res.render('libros',{
          libros
        })
      })
      .catch(error => console.log(error))

    },
    search : (req,res) => {
      let elemento = req.query.search

      /* return res.send({elemento}) */
      const books = 
      libros.filter(libro => 
        libro.titulo.toLowerCase().includes(elemento.toLowerCase()) ||
        libro.autor.toLowerCase().includes(elemento.toLowerCase()) ||
        libro.genero.toLowerCase().includes(elemento.toLowerCase()) ||
        libro.editorial.toLowerCase().includes(elemento.toLowerCase())
        )

      return res.render('busqueda', 
      {
        busqueda: elemento,
        books
      });
    },
    nosotros : (req,res) =>{
      res.render('nosotros')
    }
}