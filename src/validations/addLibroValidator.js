const { check } = require('express-validator');

module.exports = [
    
    check('titulo')
    .notEmpty().withMessage('Debe ingresar el título del libro').bail()
    .isLength({min:5, max:40}).withMessage('El Título tiene entre 5 y 40 carácteres'),

    check('autor')
    .notEmpty().withMessage('¿Cuál es el autor del libro?')
    ,

    check('precio')
    .notEmpty().withMessage('Coloca un precio').bail()
    .isInt({min:1}).withMessage('Solo numeros positivos'),

    check('paginas')
    .notEmpty().withMessage('Coloca la cantidad de páginas').bail()
    .isInt({min:1}).withMessage('Solo numeros positivos'),

    check('editorial')
    .notEmpty().withMessage('¿Cual es la editorial?'),

    check('video')
    .notEmpty().withMessage('Debe ingresar el link del video'),

    check('description2')
    .notEmpty().withMessage('Debe ingresar una descripción').bail()
    .isLength({min:10, max:700}).withMessage('La descripción puede tener entre 10 y 700 caracteres'),

    check('genero')
    .notEmpty().withMessage('¿A qué genero pertenece?')
   
]
  