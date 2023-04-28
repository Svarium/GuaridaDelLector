const db = require('../database/models')
const literalQueryUrlImage = require('../helpers/literalQueryUrlImage')
const {hashSync} = require('bcryptjs');
const bcrypt = require('bcrypt')

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

     },

     createUser : async(data, icon) => {
        try {
            const newUser = await db.Usuario.create({
                name:data.name,
                surname:data.surname,
                email:data.email,
                pass : hashSync(data.pass, 12),
                icon :icon ? icon.filename : "not image.png",
                rolId : 2
            })
            return newUser
        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            }
        }
     },

     updateUser : async(id, data, icon) => {
        try {
            const userUpdated = await db.Usuario.update({
                name:data.name,
                surname:data.surname,
                icon :icon.file ? icon.file.filename : data.icon,
            },

           {
            where : {id:id}
           });

            return userUpdated

        } catch (error) {
             console.log(error)
            throw{
                status :500,
                message : error.message
            }
        }
     },

     destroyUser : async (id) => {
        try {

            const userDestroy = await db.Usuario.destroy({
                where:{id:id},
                force:true
            })

            return userDestroy
            
        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            }
        }
     }

}