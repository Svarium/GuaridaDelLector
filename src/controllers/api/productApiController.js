const {getAllLibros,getLibrosById} = require('../../services/librosServices')

module.exports = {
    index : async (req,res)=>
    {
        try {
            const libros = await getAllLibros(req)

       return res.status(200).json({
        ok :true,
        count : libros.length,
        libros
       })

        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                  ok:false,
                  error : {
                    status :error.status || 500,
                    message : error.message || "hubo un error"
                  }
            })
            
        }
    },
    detail : async (req,res)=>{
        try {
            const libro = await getLibrosById(req.params.id)

       return res.status(200).json({
        ok :true,
        libro
       })

        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                  ok:false,
                  error : {
                    status :error.status || 500,
                    message : error.message || "hubo un error"
                  }
            })
            
        }
    }
}