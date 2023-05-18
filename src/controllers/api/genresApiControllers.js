const createResponseError = require("../../helpers/createResponseError");
const { getAllGeneros } = require("../../services/genresServices");



module.exports = {

    allGenres : async(req,res) => {

        try {

            const allGenres = await getAllGeneros()
            return res.status(200).json({
                ok:true,
                data : {
                    allGenres
                }
            })
            
        } catch (error) {
              console.log(error);
            return createResponseError(res, error);
        }
    }

}