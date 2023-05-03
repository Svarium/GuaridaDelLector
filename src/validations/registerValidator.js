const { check, body } = require('express-validator');
const db = require("../database/models")

let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/; //mayuscula, numero y 6 a 12 caracteres

module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({ min: 2 }).withMessage('Mínimo de dos letras').bail()
        .isAlpha('es-ES', {
            ignore: " "
        }).withMessage('Solo caracteres alfabéticos'),


    check('surname')
        .notEmpty().withMessage('El apellido es obligatorio').bail()
        .isLength({ min: 2, max:50 }).withMessage('Mínimo de dos letras').bail()
        .isAlpha('es-ES', {
            ignore: " "
        }).withMessage('Solo caracteres alfabeticos'),



    body('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debe ser un email con formato válido').bail()
        .custom(async(value) => {
          
              const user = await db.Usuario.findOne({
                   where: {
                       email: value
                   }
                })
                return user ? Promise.reject() : Promise.resolve();
         
        }).withMessage('El email ya se encuentra registrado'),


    check('pass')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .custom((value, {req}) => {
            if(!regExPass.test(value.trim())){
                return false
            }
            return true
        }).withMessage('Debe tener una mayuscula, minuscula y un numero. Min : 6 y max: 12'),



    body('password2')
        .notEmpty().withMessage('Debes confirmar tu contraseña').bail()
        .custom((value, { req }) => {
            if (value !== req.body.pass) {
                return false
            }
            return true
        }).withMessage('Las contraseñas no coinciden')
]