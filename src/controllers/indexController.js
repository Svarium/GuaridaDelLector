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
    admin : (req,res) =>{
return res.render('dashboard',{
  libros
})
    },
    listar : (req,res) => {
      const productsFilePath = path.join(__dirname, '../data/books.json');
      const libros = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); 
      res.render('libros',{
        libros
      })
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
    }
}