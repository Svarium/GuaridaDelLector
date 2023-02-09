const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/books.json');
const libros = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = { 
    index:(req,res)=>{
     
     res.render('index', {
        libros
      });      
    },
    listar : (req,res) => {
      const productsFilePath = path.join(__dirname, '../data/books.json');
      const libros = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); 
      res.render('libros',{
        libros
      })
    }
}