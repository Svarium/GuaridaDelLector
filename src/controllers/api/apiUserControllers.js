let db = require('../../database/models')
const {getUserById} = require('../../services/usuariosServices')
let { Op } = require('sequelize')


module.exports = {
    listUser: async (req, res) => {
            await db.Usuario.findAll()
            .then(users => {
                let response = {
                    status : 200,
                    meta: {
                        length : users.length,
                        url :   'http://localhost:3000/api/listUser'
                    },

                    data : users
                }
                return res.status(200 ).json(response)
            })
            .catch(error => {
                return res.send(error)
            })
    },
    detail : async (req,res) =>{
        try {
            const usuario = await getUserById(req.params.id)


            return res.status(200).json({
                ok:true,
                usuario
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