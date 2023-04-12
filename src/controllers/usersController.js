const {validationResult} = require('express-validator');
/* const {readJSON, writeJSON} = require("../data"); */
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
    editarPerfil: (req,res) => {


        db.Usuario.update({
            ...req.body
        },
        {
            where : {id:req.session.userLogin.id}
        })
        .then(()=>{
            res.redirect('/user/perfil')
        })
        .catch(error => console.log(error))



        
    /*  const {name, surname, email} = req.body

     console.log(req.session.userLogin);
  
     const {id} = req.session.userLogin
     
     db.Usuario.findByPk(id)
     .then(user=>{
         db.Usuario.update({
            name : name,
            surname : surname,
            email : email,
           
        
        })
     })
     .then(user=>{
        return res.send(user)
     })
     .catch(error => console.log(error))
 */
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
    }

}