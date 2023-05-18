db = require("../database/models");


module.exports = {
    getAllGeneros : async () => {
        try {
            const generos = await db.Generos.findAll()
            return generos
            
        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            }
        }
}
}
