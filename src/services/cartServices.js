const { Op } = require('sequelize')
const db = require('../database/models')

module.exports = mtd = {

    getOrder : async ({userId}) => {

        if(!userId){
            throw {
                ok:false,
                message: "Debe ingresar el userId"
            }
        }

        const [order] = await db.Order.findOrCreate({
            where: {
                [Op.and]: [
                  {
                    userId,
                  },
                  {
                    status: "pending",
                  },
                ],
              },
        defaults: {
            userId,
        },  
        include : [
            {
            association:'cart',
            through: {
                attributes: ["quantity"]
            }
            },
        ],
        });
        return order
    },

    createProductInCart: async ({userId, bookId}) => {
        if(!userId || !bookId){
            throw {
                ok:false,
                message: "Debe ingresar el userId y el bookId"
            }
        }

       const order = await mtd.getOrder({userId});

       await mtd.getCart({orderId:order.id, bookId})

       const orderReload = await order.reload({include:{all:true}})
       order.total =  mtd.calcTotal(orderReload)        
       await order.save();



    },

    removeProductFromCart: async ({userId, bookId}) => {
        if(!userId || !bookId){
            throw {
                ok:false,
                message: "Debe ingresar el userId y el bookId"
            }
        }

        const order = await mtd.getOrder({userId});

      return  mtd.removeCart({orderId:order.id, bookId})

    },

    moreOrLessQuantityFromProduct: async ({userId, bookId, action = "more" }) => {
        if(!userId || !bookId){
            throw {
                ok:false,
                message: "Debe ingresar el userId y el bookId"
            }
        }

        const order = await mtd.getOrder({userId});
        const [cart, isCreated] = await mtd.getCart({orderId: order.id, bookId})

        if(!isCreated){
            if(action === "more"){
                cart.quantity++                
            } else {
                cart.quantity--   
            }
            await cart.save()
        }
        

        const orderReload = await order.reload({include:{all:true}})
        order.total =  mtd.calcTotal(orderReload)        
        await order.save();
   

        return order


    },
    removeCart : ({orderId, bookId}) => {
        db.Cart.destroy({
            where:{
                [Op.and] :[ {
                    orderId
                },
                {
                    bookId
                }
            ],
            },
        });
    },

    clearAllProductsFromCart : async ({userId}) =>{
        if(!userId){
            throw {
                ok:false,
                message: "Debe ingresar el userId"
            };
        }

        const order = await mtd.getOrder({userId})

    return db.Cart.destroy({
            where:{orderId:order.id}
        })


    },

    modifyStatusFromOrder : async ({userId, status}) => {
        if(!userId || !status){
            throw {
                ok:false,
                message: "Debe ingresar el userId y el status"
            };
        }

        const order = await mtd.getOrder({userId});
        order.status = status
        return order.save()
    },

    getCart : ({orderId, bookId}) => {
        return db.Cart.findOrCreate({where:{
            [Op.and]:[
            {
                orderId
            },
            {
                bookId
            }
        ]
        },
        defaults : {
            orderId, 
            bookId,
        }
    })
    },

    calcTotal : ({cart}) => {
        return cart.reduce((acum, product) => {
            acum += product.precio * product.Cart.quantity
            return acum 
        }, 0);
    }
};