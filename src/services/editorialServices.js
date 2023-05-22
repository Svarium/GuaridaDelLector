db = require("../database/models");


module.exports = {
    getAllEditorial: async () => {
        try {
            const editorial = await db.Editoriales.findAll()
            return editorial
            
        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            }
        }
}
}
