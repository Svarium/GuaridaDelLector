const {check, body} = require('express-validator');
const db = require("../database/models")

module.exports = [
    check('nombre')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({ min: 2 }).withMessage('Mínimo de dos letras').bail()
        .isAlpha('es-ES', {
            ignore: " "
        }).withMessage('Solo caracteres alfabéticos').bail()
        .custom((value, {req}) => {
            return db.Editoriales.findOne({
                where : {
                    nombre : value
                }
            }).then(autor => {
                if(autor){
                    return Promise.reject()
                }
            }).catch((error) => {
                console.log(error)
                return Promise.reject('La editorial ya existe en la base de datos')
            })
        }),
]