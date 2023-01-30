const libros = require("../data/books.json")

module.exports = { 
    index:(req,res)=>{
      res.render('index', {libros});      
    }
}