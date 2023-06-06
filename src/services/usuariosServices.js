const db = require('../database/models')
const literalQueryUrlImage = require('../helpers/literalQueryUrlImage')
const {hashSync} = require('bcryptjs');
const bcrypt = require('bcrypt')
const {compareSync} = require('bcryptjs');

module.exports ={

    getAllUsers : async (req) =>{
        try {
          
            const users =  await db.Usuario.findAll(
                {
                    attributes: {
                      include:[
                        literalQueryUrlImage(req,'iconsProfile', 'icon', 'icon' )
                      ]
                    },
                    include : [{
                        association : "rol",
                    }],
                  
                  });
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
                    exclude: ['pass', 'createdAt', 'updatedAt', 'rolId'],
                    include:[
                        literalQueryUrlImage(req,'iconsProfile', 'icon', 'icon' )
                      ]
                  },
                include : [{
                    association : "rol",
                    attributes:{
                        exclude:['id', 'createdAt', 'updatedAt']
                    }
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

    getCountUsers : async () => {
        try {

            const totalUsers = await db.Usuario.count()
            return totalUsers
            
        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            } 
        }
    },

     verifyUserEmail : async (email) => {
        try {
            let user = await db.Usuario.findOne({
                where : {
                    email:email
                }
            })
            return user ? true : false
            
        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            }
        }
     },

     verifyUserPass : async (data) => {
       
        try {
            let user = await db.Usuario.findOne({
                where : {
                    email:data.email
                }
            })
            return !user || !compareSync(data.password, user.pass) ? false : true 
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