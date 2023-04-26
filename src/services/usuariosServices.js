const db = require('../database/models')

module.exports ={
     getUserById : async (id)=>{
        try {
            const usuario = db.Usuario.findByPk(id,{
                include : [{
                    association : "rol",
                    attributes :{
                        exclude : ["createdAt","updatedAt","id","rolId"]
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

     }

}