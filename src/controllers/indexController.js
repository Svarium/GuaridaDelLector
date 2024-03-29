const fs = require('fs');
const path = require('path');
const { Op } = require("sequelize");
const db =require('../database/models')



module.exports = { 
    index:(req,res)=>{

      console.log(req.session?.userLogin);
    
      db.Libros.findAll({
        attributes : ['imagen', 'precio', 'description2', 'id'],
        order : [['createdAt', 'DESC']], 
        limit :  4      
      })
      .then(libros =>{
        return res.render('index',{
          libros
        })
      })
      .catch(error => console.log(error))
     
        
    },
    admin : (req,res) =>{
     db.Libros.findAll({
      include : ['autor']
     })
     .then(libros =>{
      return res.render('dashboard',{
        libros
     })
    
}) .catch(error => console.log(error))
    },

    listar : (req,res) => {

      db.Libros.findAll({
        attributes : ['imagen', 'precio', 'description2', 'id'],
        order : [['titulo']],        
      })
      .then(libros =>{
        res.render('libros',{
          libros
        })
      })
      .catch(error => console.log(error))

    },
    search :  (req,res) => {
      const query = req.query.search;
      db.Libros.findAll({
        where : {
          titulo : {
            [Op.like] : `%${query}%`
          }
        },
        include :['genero', 'autor', 'editorial']
      })
      .then(books=>{
     
        return res.render('busqueda',{
          books
        })
      })
      
    },


    nosotros : (req,res) =>{
      res.render('nosotros')
    },

    preguntasFrecuentes : (req,res) =>{
      return res.render('preguntasFrecuentes')
    },

    listUsers : (req,res) =>{
      db.Usuario.findAll({
        attributes:['name', 'surname', 'email', 'rolId', 'id'],
        include : ['rol']
    }
       
    )
    .then(usuarios =>{
        return res.render('usuarios',{
            title: "Panel de administración",
            usuarios
        })
    })
    .catch(error => console.log(error))
    }
}