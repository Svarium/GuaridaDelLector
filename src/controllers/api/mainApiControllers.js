const createResponseError = require("../../helpers/createResponseError");
const { getCountBooks, getCountAutors, getLastBook } = require("../../services/librosServices");
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
    },

    lastBookStore : async(req,res) => {
        try {

            const book = await getLastBook(req)

            return res.status(200).json({
                ok:true,
                data:{
                    book
                }
            })
            
        } catch (error) {
            console.log(error);
            return createResponseError(res, error);
        }
    },

    /* getDataSession : (req,res) => { 
        
        console.log(req.session.userLogin);
                
                return res.status(200)
                    .set('Content-Type', 'application/json')
                    .json({  userLogin: req.session.userLogin })       
                                     
    }
 */


}