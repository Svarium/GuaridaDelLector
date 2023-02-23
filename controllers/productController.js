/* const libros = require("../data/books.json") */
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator')

const productsFilePath = path.join(__dirname, '../data/books.json');
const libros = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); 

module.exports={

    //Todos los productos por categoria

    listCategory:(req,res)=>{
      /*   const infantil = libros.filter(libro => libro.genero === "Infantil"); */
      return res.render('categoria', {
            libros,
            
        })
    },

    //Detalle de un producto

    detail : (req,res) => {
        const productsFilePath = path.join(__dirname, '../data/books.json');
        const libros = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let id = +req.params.id

        let libro = libros.find(libro => libro.id === id)

        return res.render('detalle', {
            libro
        })
    },

    // muestra el formulario de creacion
    
    agregar: (req,res)=>{
        return res.render('agregarLibro')
    },

    // agregar - metodo par agregar/crear
    store: (req,res) => {

        const errors = validationResult(req)

    
       /*  return res.send(errors.mapped()) */
   
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
        const productsFilePath = path.join(__dirname, '../data/books.json');
        const libros = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); 
        const {titulo, precio, autor, genero, editorial, paginas, description1, description2, video} = req.body;

        const newLibro = {
            id : libros[libros.length -1].id +1,
            titulo : titulo.trim(),
            precio : +precio,
            autor : autor.trim(),
            genero : genero,
            editorial : editorial.trim(),
            video : video,
            paginas : +paginas,
            description2 : description2,
            imagen : req.file ? req.file.filename : null,
        };


        libros.push(newLibro);

        fs.writeFileSync(productsFilePath,JSON.stringify(libros, null, 3),'utf-8');

        return res.redirect('/libros')


       } else{

        if(req.file){
            fs.existsSync(`./public/images/${req.file.filename}`) && fs.unlinkSync(`./public/images/${req.file.filename}`) //SI HAY ERROR Y CARGÓ IMAGEN ESTE METODO LA BORRA
        }

        const productsFilePath = path.join(__dirname, '../data/books.json');
        const libros = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); 

        return res.render('agregarLibro',{
            errors: errors.mapped(),
            old : req.body
        })
       }       

    },

    //muestra el formulario para editar
    editar: (req,res)=>{
        const {id} = req.params;
        const libroAEditar = libros.find(libro => libro.id === +id);

        return res.render('editarLibro',{
            ...libroAEditar
        })
        
    },

    //Metodo para editar

    update: (req,res) => {

        const errors = validationResult(req);

         /* return res.send(errors.mapped()) */

        if(req.fileValidationError){ //este if valida que solo se puedan subir extensiones (jpg|jpeg|png|gif|webp)
            errors.errors.push({
                value : "",
                msg : req.fileValidationError,
                param : "image",
                location : "file"
            })
        }

        if(errors.isEmpty()){

            const productsFilePath = path.join(__dirname, '../data/books.json');
            const libros = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); 

            const {titulo, precio, autor, genero, editorial, paginas, description2, imagen} = req.body;

        const id = +req.params.id

        const libro = libros.find(libro => libro.id === +id)

        const libroUpdated = {
            id : id,
            titulo : titulo.trim(),
            precio : +precio,
            autor : autor.trim(),
            genero : genero,
            editorial : editorial.trim(),
            paginas : +paginas,
            description2 : description2,
            imagen : req.file ? req.file.filename : libro.imagen
        };

        //si existe una nueva imagen borra la imagen anterior y lee de nuevo el json
        if(req.file){
            fs.existsSync(`./public/images/${libro.imagen}`) && fs.unlinkSync(`./public/images/${libro.imagen}`) 
            const productsFilePath = path.join(__dirname, '../data/books.json');
            const libros = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); 
        }

        const librosModified = libros.map(libro=>{
            if(libro.id === +id){
                return libroUpdated
            }
            return libro
        });


        fs.writeFileSync(productsFilePath,JSON.stringify(librosModified, null, 3),'utf-8');
        return res.redirect('/products/detail/' + id )

        } else {

            const productsFilePath = path.join(__dirname, '../data/books.json');
            const libros = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); 

            if(req.file){
                fs.existsSync(`./public/images/${req.file.filename}`) && fs.unlinkSync(`./public/images/${req.file.filename}`) //SI HAY ERROR Y CARGÓ IMAGEN ESTE METODO LA BORRA
            }

            const {id} = req.params;
            const libroAEditar = libros.find(libro => libro.id === +id);
    
            return res.render('editarLibro',{
                ...libroAEditar,
                errors : errors.mapped(),
                old : req.body
            })
            



        }




        
    },
    remove : (req,res)=>{
        const {id} = req.params;
        const librosModified = libros.filter(libro => libro.id !== +id )
        fs.writeFileSync(productsFilePath, JSON.stringify(librosModified,null,3),'utf-8')
        return res.redirect('/libros')
    } 
    
}