const db = require('../database/models')

module.exports ={

    getAllUsers : async () =>{
        try {
            const users = await await db.Usuario.findAll(
                {
                    attributes: {
                      exclude: ['pass']
                    }
                  }
            )
            return users
        } catch (error) {
            console.log(error)
            throw {
                status: 500,
                message : error.message
            }
        }
    },


     getUserById : async (id)=>{
        try {
            const usuario = db.Usuario.findByPk(id,{
                attributes: {
                    exclude: ['pass']
                  },
                include : [{
                    association : "rol"
                }]
            })
            return usuario
        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            }
        }

     }

}