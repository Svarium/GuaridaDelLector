const createResponseError = require("../../helpers/createResponseError");
const { getAllAutors } = require("../../services/autorsServices");





module.exports = {

    allAutors : async(req,res) => {

        try {

            const autors = await getAllAutors()
            return res.status(200).json({
                ok:true,
                data : {
                   autors
                }
            })
            
        } catch (error) {
              console.log(error);
            return createResponseError(res, error);
        }
    }

}