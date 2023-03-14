const { check } = require('express-validator');

module.exports = [
    
    check('titulo')
    .notEmpty().withMessage('Debe ingresar el título del libro').bail()
    .isLength({min:5, max:20}).withMessage('El Título tiene entre 5 y 20 carácteres'),

    check('autor')
    .notEmpty().withMessage('Debe ingresar el autor del libro').bail()
    .isLength({min:5, max:20}).withMessage('El autor tiene entre 5 y 20 carácteres'),

    check('precio')
    .notEmpty().withMessage('Coloca un precio').bail()
    .isInt({min:1}).withMessage('Solo numeros positivos'),

    check('paginas')
    .notEmpty().withMessage('Coloca la cantidad de páginas').bail()
    .isInt({min:1}).withMessage('Solo numeros positivos'),

    check('editorial')
    .notEmpty().withMessage('Debe ingresar la editorial').bail()
    .isLength({min:5, max:20}).withMessage('La editorial tiene entre 5 y 20 carácteres'),

    check('video')
    .notEmpty().withMessage('Debe ingresar el link del video'),

    check('description2')
    .notEmpty().withMessage('Debe ingresar una descripción').bail()
    .isLength({min:10, max:500}).withMessage('La descripción puede tener entre 10 y 500 caracteres'),

    check('genero')
    .notEmpty().withMessage('¿A qué genero pertenece?')
   
]
  