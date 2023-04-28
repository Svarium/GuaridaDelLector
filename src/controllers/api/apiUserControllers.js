const { validationResult } = require('express-validator')
const createResponseError = require('../../helpers/createResponseError')
const {getUserById, getAllUsers, createUser, updateUser, destroyUser} = require('../../services/usuariosServices')
let { Op } = require('sequelize')


module.exports = {
    listUser: async (req, res) => {
           try {
            const users = await getAllUsers(req)
            return res.status(200).json({
                ok: true,            
                data : users,
                meta : {
                    status: 200,
                    total : users.length,
                    url : '/api/users'
                },
            })
           } catch (error) {
            console.log(error)
            return createResponseError(res, error)
           }
    },
    detail : async (req,res) =>{
        try {
            const usuario = await getUserById(req.params.id, req)


            return res.status(200).json({
                ok: true,            
                data : usuario,
                meta : {
                    status: 200,
                    total : 1,
                    url : `/api/autors/${req.params.id}`
                },
            })

        } catch (error) {
            console.log(error)
            return createResponseError(res, error)
        }
    },

    store : async (req,res) => {
        try {

            const errors = validationResult(req)

            if(req.fileValidationError){ 
                errors.errors.push({
                    value : "",
                    msg : req.fileValidationError,
                    param : "icon",
                    location : "file"
                })
            }
    
            if (!req.file){ 
                errors.errors.push({ 
                    value : "",
                    msg : "Debes subir una imagen de perfil",
                    param : "icon",
                    location : "file"
                })
            }

            if(!errors.isEmpty()) throw{
                status:400,
                message:errors.mapped()
            }

            const newUser = await createUser(req.body, req.file)
            return res.status(200).json({
                ok: true,            
                data : {
                    message: "usuario creado correctamente",
                    newUser:{
                        id: newUser.id,
                        name:newUser.name,
                        surname: newUser.surname,
                        email:newUser.email
                    }},
                meta : {
                    status: 200,
                    total : 1,
                    url : `/api/users/`
                },
            })

            
        } catch (error) {
            console.log(error)
            return createResponseError(res, error)
        }
    },

    update : async (req,res) => {

        try {
            const errors = validationResult(req);

        
            if(req.fileValidationError){ //este if valida que solo se puedan subir extensiones (jpg|jpeg|png|gif|webp)
                errors.errors.push({
                    value : "",
                    msg : req.fileValidationError,
                    param : "icon",
                    location : "file"
                })
            }

            if(!errors.isEmpty()) throw{
                status:400,
                message:errors.mapped()
            }

            const user = await updateUser(req.params.id, req.body, req.file)
            return res.status(200).json({
                ok: true,            
                data : {
                    message : "Usuario editado correctamente",
                    user: {
                        id: user.id,
                        name:user.name,
                        surname:user.surname,
                        email:user.email
                    }    
                },
                meta : {
                    status: 200,
                    total : 1,
                    url : `/api/users/${req.params.id}` 
                },
            })


    
        } catch (error) {
            console.log(error)
            return createResponseError(res, error)
        }

    },

    destroy : async (req,res) => {
        try {

            const userDeleted = await destroyUser(req.params.id)
            return res.status(200).json({
                ok: true,            
                data : {
                    message : "Usuario eliminado Exitosamente",
                    userDeleted},
                meta : {
                    status: 200,
                    total : 1,
                    url : `/api/users/${req.params.id}`
                },
            })
            
        } catch (error) {
            console.log(error)
            return createResponseError(res, error) 
        }
    }
  
}