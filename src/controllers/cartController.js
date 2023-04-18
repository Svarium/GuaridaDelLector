const fs = require('fs');
const path = require('path');
const db = require("../database/models")



module.exports = {
    cart : (req, res) => {
       const libros = db.Libros.findAll({
        order: [["createdAt", "ASC"]],
        limit: 6,
        include:["genero"]

        })

     const libro = db.Libros.findByPk(req.params.id,{
            include : ['autor']
        })

        Promise.all([libro,libros])
        .then(([libro,libros])=>{
            return res.render('cart',{
                libros,
                libro
            })
        })
        .catch(error => console.log(error))

       
 }}