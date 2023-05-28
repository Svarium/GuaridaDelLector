
const sendErrorResponse = require('../../helpers/sendErrorResponse');
const sendSuccesResponse = require('../../helpers/sendSuccesResponse');
const { getOrder, createProductInCart, removeProductFromCart, moreQuantityFromProduct, moreOrLessQuantityFromProduct, clearAllProductsFromCart, modifyStatusFromOrder } = require('../../services/cartServices')

module.exports = {

    getOrderPending : async (req,res) => {

        try {
            const {id} = req.session.userLogin
           /*  const {userId:id} = req.body */

        const order = await getOrder({userId:id});


          sendSuccesResponse(res,{data:order })
        } catch (error) {
          sendErrorResponse(res, error)
        }

       
    },

    addProduct : async (req,res) => {

        try {
            const {bookId} = req.body;
            const {id} = req.session.userLogin
          await  createProductInCart({userId:id, bookId})
            sendSuccesResponse(res)
        } catch (error) {
            sendErrorResponse(res, error)
        }   
    },

    removeProduct : async (req,res) => {

        try {
            const {bookId} = req.body;
            const {id} = req.session.userLogin
          await  removeProductFromCart({userId:id , bookId})
            sendSuccesResponse(res)
        } catch (error) {
            sendErrorResponse(res, error)
        }   

    },

    moreQuantity : async (req,res) => {

        try {
            const {bookId} = req.body;
            const {id} = req.session.userLogin
          await  moreOrLessQuantityFromProduct({userId:id , bookId})
            sendSuccesResponse(res)
        } catch (error) {
            sendErrorResponse(res, error)
        }   

    },

    lessQuantity : async (req,res) => {
        try {
            const {bookId} = req.body;
            const {id} = req.session.userLogin
          await  moreOrLessQuantityFromProduct({userId:id , bookId, action:"less"})
            sendSuccesResponse(res)
        } catch (error) {
            sendErrorResponse(res, error)
        }   

    },

    clearCart : async (req,res) => {
        try {
            const {id} = req.session.userLogin
           await  clearAllProductsFromCart({userId:id})
           sendSuccesResponse(res)
        } catch (error) {
            sendErrorResponse(res, error)
        }
    },

    statusOrder : async (req,res) => {
        try {
            const {status} = req.body
            const {id} = req.session.userLogin
           await modifyStatusFromOrder({userId:id, status})
           sendSuccesResponse(res)
        } catch (error) {
            sendErrorResponse(res, error)
        }
    }

}