const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/books.json');
const libros = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = { 
    index:(req,res)=>{
      const novela = libros.filter(libro => libro.genero === "novela");
      res.render('index', {
        libros,
        novela
      });      
    },
    listar : (req,res) => {
      res.render('libros',{
        libros
      })
    }
}