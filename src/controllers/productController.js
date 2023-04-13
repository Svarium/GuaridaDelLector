/* const libros = require("../data/books.json") */
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator')
const { Op } = require("sequelize");




const db =require('../database/models')

module.exports={

    //Todos los productos por categoria

    listCategory:(req,res)=>{
    db.Libros.findAll({
        include : ["genero"]
    })
    .then(libros =>{
        return res.render('categoria', {
            libros,
            
        })
    })
    .catch(error => console.log(error))
     
    },

    //Detalle de un producto

    detail : (req,res) => {
        let id = req.params.id

       db.Libros.findByPk(id, {
        include :['genero', 'autor', 'editorial']
       })
       .then(libro =>{
       
        return res.render('detalle', {
            libro
        })
       })
       .catch(error => console.log(error))
     
    },

    // muestra el formulario de creacion
    
    agregar: (req,res)=>{
       const genero = db.Generos.findAll({
        order : [['nombre']],
        attributes : ['nombre', 'id']
       })
    
       const autor = db.Autores.findAll({
        order : [['nombre']],
        attributes : ['nombre', 'id']
       })

       const editorial = db.Editoriales.findAll({
        order : [['nombre']],
        attributes : ['nombre', 'id']
       })

       Promise.all([genero, autor, editorial])
       .then(([genero, autor, editorial])=>{
        return res.render('agregarLibro',{
            genero,
            autor,
            editorial
        })
       })
       .catch(error => console.log(error))

    },

    // agregar - metodo par agregar/crear
    store: (req,res) => {

        const errors = validationResult(req)

    
        /* return res.send(errors.mapped()) */
   
        if(req.fileValidationError){ //este if valida que solo se puedan subir extensiones (jpg|jpeg|png|gif|webp)
            errors.errors.push({
                value : "",
                msg : req.fileValidationError,
                param : "image",
                location : "file"
            })
        }

              if(!req.file){  //este if valida que se suba una imagen
            errors.errors.push({
                value : "",
                msg : "El libro debe tener una imagen",
                param : "image",
                location : "file"
            })

            
        } 


       if(errors.isEmpty()){
     
        

        const {titulo, precio, autor, genero, editorial, paginas, description2, video}  = req.body;

     

        db.Libros.create( {
            
                titulo : titulo.trim(),
                precio : precio,
                autorId : autor,
                generoId : genero,
                editorialId : editorial,
                video : video,
                paginas : paginas,
                description2 : description2,
                imagen : req.file ? req.file.filename : null,
            
        })
        .then(libro =>{
            return res.redirect('/admin')
        })
        .catch(error => console.log(error))     
      

       } else{

        if(req.file){
            fs.existsSync(`./public/images/${req.file.filename}`) && fs.unlinkSync(`./public/images/${req.file.filename}`) //SI HAY ERROR Y CARGÓ IMAGEN ESTA FUNCIÓN LA BORRA
        }

        const genero = db.Generos.findAll({
            order : [['nombre']],
            attributes : ['nombre', 'id']
           })
        
           const autor = db.Autores.findAll({
            order : [['nombre']],
            attributes : ['nombre', 'id']
           })
    
           const editorial = db.Editoriales.findAll({
            order : [['nombre']],
            attributes : ['nombre', 'id']
           })
    
           Promise.all([genero, autor, editorial])
           .then(([genero, autor, editorial])=>{
            return res.render('agregarLibro',{
                genero,
                autor,
                editorial,
                errors: errors.mapped(),
                old : req.body
            })
           })
           .catch(error => console.log(error))
    
       }       

    },

    //muestra el formulario para editar
    editar: (req,res)=>{
        const {id} = req.params;
       
        const libro = db.Libros.findByPk(id, {
            include :['genero', 'autor', 'editorial']
        })

        const genero = db.Generos.findAll({
            order : [['nombre']],
            attributes : ['nombre', 'id']
           })
        
        const autor = db.Autores.findAll({
            order : [['nombre']],
            attributes : ['nombre', 'id']
           })
    
        const editorial = db.Editoriales.findAll({
            order : [['nombre']],
            attributes : ['nombre', 'id']
           })

    Promise.all([libro,genero, autor, editorial])  
    .then(([libro,genero, autor, editorial])=>{
        return res.render('editarLibro',{
            ...libro.dataValues, 
            genero,
            autor, 
            editorial
        })
    })  
    .catch(error => console.log(error))   

    },

    //Metodo para editar

    update: (req,res) => {

        const errors = validationResult(req);

        if(req.fileValidationError){ //este if valida que solo se puedan subir extensiones (jpg|jpeg|png|gif|webp)
            errors.errors.push({
                value : "",
                msg : req.fileValidationError,
                param : "image",
                location : "file"
            })
        }

        if(errors.isEmpty()){

            const {titulo, precio, autor, genero, editorial, paginas, description2, video}  = req.body;

        const id = +req.params.id

        db.Libros.findByPk(id)
        .then(libro => {

            db.Libros.update(
            
                {
                    titulo : titulo.trim(),
                    precio : precio,
                    autorId : autor,
                    generoId : genero,
                    editorialId : editorial,
                    video : video,
                    paginas : paginas,
                    description2 : description2,
                    imagen : req.file ? req.file.filename : libro.imagen
                },
                {
                    where : {id}
                }
                
                  )
                  .then(libroUpdate => {
                   
        if(req.file){
            fs.existsSync(`./public/images/libros/${libroUpdate.imagen}`) && fs.unlinkSync(`./public/images/libros/${libroUpdate.imagen}`)  
        }
        return res.redirect('/products/detail/'
        + id)
                  })
                   
        })
        .catch(error=> console.log(error))

       

        } else {

    

            if(req.file){
                fs.existsSync(`./public/images/${req.file.filename}`) && fs.unlinkSync(`./public/images/${req.file.filename}`) //SI HAY ERROR Y CARGÓ IMAGEN ESTE METODO LA BORRA
            }

            const {id} = req.params;
       
            const libro = db.Libros.findByPk(id, {
                include :['genero', 'autor', 'editorial']
            })
    
            const genero = db.Generos.findAll({
                order : [['nombre']],
                attributes : ['nombre', 'id']
               })
            
            const autor = db.Autores.findAll({
                order : [['nombre']],
                attributes : ['nombre', 'id']
               })
        
            const editorial = db.Editoriales.findAll({
                order : [['nombre']],
                attributes : ['nombre', 'id']
               })
    
        Promise.all([libro,genero, autor, editorial])  
        .then(([libro,genero, autor, editorial])=>{
            return res.render('editarLibro',{
                ...libro.dataValues, 
                genero,
                autor, 
                editorial,
                errors: errors.mapped(),
                old : req.body
            })
        })  
        .catch(error => console.log(error))

        }
        
    },
    remove : (req,res)=>{
        
       db.Libros.destroy({
        where : {id:req.params.id},
        force:true
       }).then(()=>{
        return res.redirect('/#new')
       })
       .catch(error => console.log(error))
        
    } 
    
}