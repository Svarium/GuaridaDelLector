const {validationResult} = require('express-validator');
const {readJSON, writeJSON} = require("../data");
const bcrypt = require('bcrypt')

const db = require("../database/models")


module.exports = {
    register : (req,res) => {
        return res.render('register')
    },
    processRegister: (req,res) =>{

        const errors = validationResult(req);

       /*  return res.send(errors.mapped()) */

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

     /* return res.send(req.body) */

        const {name, surname, email, pass} = req.body 

         db.Usuarios.create({
            name,
            surname,
            email,
            pass : bcrypt.hashSync(pass, 10),
            icon :req.file ? req.file.filename : "not image.png",
            rolId : 2
        })
        .then(usuario => {

            /* return res.send(usuario) */

                req.session.userLogin = {
                    id : usuario.id, 
                    name : usuario.name,
                    rolId : usuario.rolId,
                    icon : usuario.icon,
                    surname : usuario.surname,
                    email : usuario.email
    
                };
                if (req.body.recordar){
                    res.cookie('userGuaridaDelLector', req.session.userLogin, {maxAge: 1000*60*5})
                }
                
                
                return res.redirect('/')

            })
            .catch(error => console.log(error))

       


        /* const users = readJSON('users.json');
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
        */


    }else {

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

       /*  return res.send(errors) */



        if(errors.isEmpty()){
            const {id, name, rol, icon, surname, email} = readJSON('users.json').find(user => user.email === req.body.email);

            req.session.userLogin = {
                id, 
                name,
                rol,
                icon,
                surname,
                email

            };
            if (req.body.recordar){
                res.cookie('userGuaridaDelLector', req.session.userLogin, {maxAge: 1000*60*5})
            }

            console.log(req.session);
            return res.redirect('/')
        } else {
            return res.render('login',{
                errors : errors.mapped()
            })
        }

    },
    logout: (req, res) => {
        req.session.destroy();
        res.cookie('userGuaridaDelLector', null, {maxAge: -1})
        return res.redirect('/')
    },

    perfil : (req,res) =>{
        return res.render('perfil')
    }

}