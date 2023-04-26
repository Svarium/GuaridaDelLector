let db = require('../../database/models')

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
    }
}