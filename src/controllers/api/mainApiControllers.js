const createResponseError = require("../../helpers/createResponseError");
const { getCountBooks, getCountAutors } = require("../../services/librosServices");
const { getCountUsers } = require("../../services/usuariosServices");


module.exports = {

    metrics : async(req,res) => {

        try {

            const totalBooks = await getCountBooks();
            const totalAutors = await getCountAutors();
            const totalUsers = await getCountUsers();

            return res.status(200).json({
                ok: true,
                data: {
                    totalBooks,
                    totalAutors,
                    totalUsers
                }
            });
            
        } catch (error) {
              console.log(error);
            return createResponseError(res, error);
        }
    }

}