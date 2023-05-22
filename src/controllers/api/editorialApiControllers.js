const createResponseError = require("../../helpers/createResponseError");
const { getAllEditorial } = require("../../services/editorialServices");




module.exports = {

    allEditorial : async(req,res) => {

        try {

            const allEditorial = await getAllEditorial()
            return res.status(200).json({
                ok:true,
                data : {
                   allEditorial
                }
            })
            
        } catch (error) {
              console.log(error);
            return createResponseError(res, error);
        }
    }

}