/* const libros = require("../data/books.json") */
const fs = require('fs');
const path = require('path');

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
        let id = +req.params.id

        let libro = libros.find(libro => libro.id === id)

        return res.render('detalle', {
            libro
        })
    },

    //formulario de creacion
    agregar: (req,res)=>{
        return res.render('agregarLibro')
    },

    // agregar - metodo par agregar/crear
    store: (req,res) => {
        const {titulo, precio, autor, genero, editorial, paginas, description1, description2, imagen} = req.body;

        const newLibro = {
            id : libros[libros.length -1].id +1,
            titulo : titulo.trim(),
            precio : +precio,
            autor : autor.trim(),
            genero : genero,
            editorial : editorial.trim(),
            paginas : +paginas,
            description2 : description2,
            imagen : null
        };

        libros.push(newLibro);

        fs.writeFileSync(productsFilePath,JSON.stringify(libros, null, 3),'utf-8');

        return res.redirect('/libros')


    },


    //formulario para editar
    editar: (req,res)=>{
        const {id} = req.params;
        const libroAeditar = libros.find(libro => libro.id === +id);
        return res.render('editarLibro',{
            ...libroAeditar
        })
        
    },

    //Metodo para editar

    update: (req,res) => {
        const {titulo, precio, autor, genero, editorial, paginas, description1, description2, imagen} = req.body;

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
            imagen : imagen
        };
        const librosModified = libros.map(libro=>{
            if(libro.id === +id){
                return libroUpdated
            }
            return libro
        });

        /* res.send(librosModified) */
        fs.writeFileSync(productsFilePath,JSON.stringify(librosModified, null, 3),'utf-8');
        return res.redirect('/products/detail/' + id )
    },
    remove : (req,res)=>{
        const {id} = req.params;
        const librosModified = libros.filter(libro => libro.id !== +id )
        fs.writeFileSync(productsFilePath, JSON.stringify(librosModified,null,3),'utf-8')
        return res.redirect('/libros')
    } 
    
}