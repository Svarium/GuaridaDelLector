const db = require('../database/models')
const {literalQueryUrlImage} = require('../helpers')
module.exports = {
    getAllLibros : async (req) => {
     try {
      const libros = await db.Libros.findAll({
        include : [
            {
            association : "autor",
            attributes :{
                exclude : ["createdAt","updatedAt","id","autorId"]
            }
        },
        {
            association : "genero",
            attributes :{
                exclude : ["createdAt","updatedAt","id","generoId"]
            }
        },{
            association : "editorial",
            attributes :{
                exclude : ["createdAt","updatedAt","id","editorialId"]
            }
        }
    ]
           })
      return libros
     } catch (error) {
        console.log(error)
        throw{
            status :500,
            message : error.message
        }
     }

    },
    getLibrosById: async (id) =>{
        try {
          const libro = await db.Libros.findByPk(id,{
            include : [{
                association : "autor",
                attributes :{
                    exclude : ["createdAt","updatedAt","id","autorId"]
                }
            },
            {
                association : "genero",
                attributes :{
                    exclude : ["createdAt","updatedAt","id","generoId"]
                }
            },{
                association : "editorial",
                attributes :{
                    exclude : ["createdAt","updatedAt","id","editorialId"]
                }
            }
        ]
          })
          
         return libro
        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            }
        }
    }
}