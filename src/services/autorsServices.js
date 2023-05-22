db = require("../database/models");


module.exports = {
    getAllAutors : async () => {
        try {
            const autores = await db.Autores.findAll()
            return autores
            
        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            }
        }
}
}
