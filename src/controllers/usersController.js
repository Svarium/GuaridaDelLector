const {validationResult} = require('express-validator');
const {readJSON, writeJSON} = require("../data");
const {hashSync} = require('bcryptjs')

module.exports = {
    register : (req,res) => {
        return res.render('register')
    },
    processRegister: (req,res) =>{

        const errors = validationResult(req);

        if(req.fileValidationError){ //este if valida que solo se puedan subir extensiones (jpg|jpeg|png|gif|webp)
            errors.errors.push({
                value : "",
                msg : req.fileValidationError,
                param : "icon",
                location : "file"
            })
        }

              if(!req.file){  //este if valida que se suba una imagen
            errors.errors.push({
                value : "",
                msg : "Debe subir una imagen de perfil",
                param : "icon",
                location : "file"
            })
            
        } 

        

     if(errors.isEmpty()){

        const users = readJSON('users.json');
        const {name, surname, email, password} = req.body

        const newUser = {
            id : users.length ? users[users.length -1].id +1 : 1,
            name : name.trim(),
            surname : surname.trim(),
            email : email.trim(),
            password : hashSync(password, 10),
            icon : req.file.filename,
            rol : 'user'
        }

        users.push(newUser)

        writeJSON('users.json', users);

        return res.redirect('/user/login')


     } else {

        return res.render('register', {
            errors : errors.mapped(),
            old : req.body
        })

     }

    },




    login : (req,res) => {
        return res.render('login')
    },

    processLogin : (req,res) =>{

        const errors =  validationResult(req);

        /* return res.send(errors) */

        if(errors.isEmpty()){
            const {id, name, rol} = readJSON('users.json').find(user=> user.email === req.body.email);

            req.session.userLogin = {
                id, 
                name,
                rol
            };

            console.log(req.session);
            return res.redirect('/')
        } else {
            return res.render('login',{
                errors : errors.mapped()
            })
        }

    }
}