const {getAllLibros,getLibrosById} = require('../../services/librosServices')
const createResponseError = require('../../helpers/createResponseError')

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
    }
}