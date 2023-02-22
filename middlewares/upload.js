const multer = require('multer');
const path = require('path');

const storageProductsImages = multer.diskStorage({
    destination : function (req,file,callback){
        callback(null, 'public/images')
    },
    filename : function (req,file,callback) {
        callback(null, `${Date.now()}_products_${path.extname(file.originalname)}`)
    }
})

const uploadProductImages = multer({
    storage : storageProductsImages,

});

module.exports = {
    uploadProductImages
}