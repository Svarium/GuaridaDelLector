const db = require('../database/models')
const literalQueryUrlImage = require('../helpers/literalQueryUrlImage')

module.exports ={

    getAllUsers : async (req) =>{
        try {
            const users = await await db.Usuario.findAll(
                {
                    attributes: {
                      exclude: ['pass'],
                      include:[
                        literalQueryUrlImage(req,'iconsProfile', 'icon', 'icon' )
                      ]
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


     getUserById : async (id, req)=>{
        try {
            const usuario = db.Usuario.findByPk(id,{
                attributes: {
                    exclude: ['pass'],
                    include:[
                        literalQueryUrlImage(req,'iconsProfile', 'icon', 'icon' )
                      ]
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