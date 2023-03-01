const fs = require('fs');
const path =require('path')

const productsFilePath = path.join(__dirname, '../data/books.json');

const libros = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


module.exports = {
    cart : (req, res) => {
        return res.render('cart',{
            libros
        })
 }}