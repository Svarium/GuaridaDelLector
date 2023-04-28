const {getAllLibros,getLibrosById, createLibro, updateLibro, destroyLibro} = require('../../services/librosServices')
const createResponseError = require('../../helpers/createResponseError')
const { validationResult } = require('express-validator')

module.exports = {
    index : async (req,res)=>
    {
        try {
            const libros = await getAllLibros(req)

            return res.status(200).json({
                ok: true,            
                data : libros,
                meta : {
                    status: 200,
                    total : libros.length,
                    url : '/api/libros'
                },
            })
        } catch (error) {
            console.log(error)
            return createResponseError(res, error)   
        }
    },
    detail : async (req,res)=>{
        try {
            const libro = await getLibrosById(req.params.id,req)

            return res.status(200).json({
                ok: true,            
                data : libro,
                meta : {
                    status: 200,
                    total : 1,
                    url : `/api/libros/${req.params.id}`
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
                    param : "image",
                    location : "file"
                })
            }

            if (!req.file){ 
                errors.errors.push({ 
                    value : "",
                    msg : "Debes subir una imagen del libro",
                    param : "image",
                    location : "file"
                })
            }

            if(!errors.isEmpty()) throw{
                status:400,
                message:errors.mapped()
            }

            const newLibro = await createLibro(req.body, req.file)
            return res.status(200).json({
                ok: true,            
                data : {
                    message:"Producto creado exitosamente",
                    newLibro
                },
                meta : {
                    status: 200,
                    total : 1,
                    url : `/api/libros/`
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

            const libroUpdated = await updateLibro(req.params.id, req.body, req.file)

            return res.status(200).json({
                ok: true,            
                data : {
                    message:"Producto editado exitosamente",
                    libroUpdated
                },
                meta : {
                    status: 200,
                    total : 1,
                    url : `/api/libros/${req.params.id}` 
                },
            })
            
        } catch (error) {
            console.log(error)
            return createResponseError(res, error) 
        }
    },

    destroy : async (req,res) => {
        try {
            const libroDeleted = await destroyLibro(req.params.id)
            return res.status(200).json({
                ok: true,            
                data : {
                    message:"Producto eliminado exitosamente",
                    libroDeleted},
                meta : {
                    status: 200,
                    total : 1,
                    url : `/api/libros/${req.params.id}` 
                },
            })
        } catch (error) {
            console.log(error)
            return createResponseError(res, error) 
        }
    }

}