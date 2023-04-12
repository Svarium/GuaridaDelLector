const fs = require('fs');
const path = require('path');
const db = require("../database/models")



module.exports = {
    cart : (req, res) => {


        db.Libros.findByPk(req.params.id,{
            include : ['autor']
        })
        .then(libro=>{
            return res.render('cart',{
                libro
            })
        })
        .catch(error => console.log(error))

       /*   const productsFilePath = path.join(__dirname, '../data/books.json');
        const libros = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let id = +req.params.id

        let libro = libros.find(libro => libro.id === id)

        return res.render('cart',{
            libro
        }) */
       
 }}