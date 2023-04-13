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

       
 }}