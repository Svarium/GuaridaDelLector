const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt')
const fs = require('fs');
const path = require('path');

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

         db.Usuario.create({
            name,
            surname,
            email,
            pass : bcrypt.hashSync(pass, 10),
            icon :req.file ? req.file.filename : "not image.png",
            rolId : 2
        })
        .then(usuario => {             
                
                return res.redirect('/user/login')

            })
            .catch(error => console.log(error))


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

        if(errors.isEmpty()){
            const {email} = req.body

            db.Usuario.findOne({
                where : {
                    email
                }
            })
            .then((usuario) => {

                req.session.userLogin = {
                    id : usuario.id, 
                    name : usuario.name,
                    rol: usuario.rolId,
                    icon : usuario.icon,
    
                };
                if (req.body.recordar){
                    res.cookie('userGuaridaDelLector', req.session.userLogin, {maxAge: 1000*60*5})
                }
                
                return res.redirect('/')
                

            })
            .catch(error => console.log(error))


        } else {
            return res.render('login',{
                errors : errors.mapped()
            })
        }

    },
    editarPerfil: (req, res) => {
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
  
         
  
      if(errors.isEmpty()){
            // manejo de errores de validación
  
            const { name, surname } = req.body;
        
            db.Usuario.findOne({
              where: {
                id: +req.params.id,
              },
            })
              .then((usuario) => {
                db.Usuario.update(
                  {
                    name: name,
                    surname: surname,
                    icon: req.file ? req.file.filename : usuario.icon,
                  },
                  {
                    where: {
                      id: +req.params.id,
                    },
                  }
                )
                  .then((data) => {
                    db.Usuario.findOne({
                      where: {
                        id: +req.params.id,
                      },
                    })
                      .then((usuario) => {
                        req.session.userLogin = {
                          id: usuario.id,
                          name: usuario.name,
                          icon: usuario.icon,
                          rol: usuario.rolId,
                        };
                        if (req.cookies.userGuaridaDelLector){
                          res.cookie('userGuaridaDelLector', '', { maxAge: -1 });
                          res.cookie('userGuaridaDelLector', req.session.userLogin, {maxAge: 1000*60*5});
                        }
                        req.session.save((err) => {
                          req.session.reload((err) => {
                            return res.redirect('/user/perfil');
                          });
                        });
                      })
                      .catch((err) => res.send(err));
                  })
                  .catch((err) => res.send(err));
              })
              .catch((err) => res.send(err));
          } else {

            db.Usuario.findByPk(req.session.userLogin.id,{
                attributes : ['name', 'surname', 'email', 'icon'],
                include : ['rol']
            })
            .then(user =>{
               return res.render('perfil',{
                    user,
                    errors : errors.mapped(),
                    old : req.body
                })
            })
            .catch(error => console.log(error))
          }
      

    },
    logout: (req, res) => {
        req.session.destroy();
        res.cookie('userGuaridaDelLector', null, {maxAge: -1})
        return res.redirect('/')
    },

    perfil : (req,res) =>{
        db.Usuario.findByPk(req.session.userLogin.id,{
            attributes : ['name', 'surname', 'email', 'icon'],
            include : ['rol']
        })
        .then(user =>{
           return res.render('perfil',{
                user
            })
        })
        .catch(error => console.log(error))
    },
    

}