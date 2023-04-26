const createResponseError = require('../../helpers/createResponseError')
const {getUserById, getAllUsers} = require('../../services/usuariosServices')
let { Op } = require('sequelize')


module.exports = {
    listUser: async (req, res) => {
           try {
            const users = await getAllUsers()
            return res.status(200).json({
                ok: true,            
                data : users,
                meta : {
                    status: 200,
                    total : users.length,
                    url : '/api/users'
                },
            })
           } catch (error) {
            console.log(error)
            return createResponseError(res, error)
           }
    },
    detail : async (req,res) =>{
        try {
            const usuario = await getUserById(req.params.id)


            return res.status(200).json({
                ok: true,            
                data : usuario,
                meta : {
                    status: 200,
                    total : 1,
                    url : `/api/autors/${req.params.id}`
                },
            })

        } catch (error) {
            console.log(error)
            return createResponseError(res, error)
        }
    },
  
}