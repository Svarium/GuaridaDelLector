const libros = require("../data/books.json")

module.exports={
    listCategory:(req,res)=>{
        return res.render('categoria', {libros})
    },
    detail : (req,res) => {
        let id = +req.params.id

        let libro = libros.find(libro => libro.id === id)

        return res.render('detalle', {
            libro
        })
    }
}