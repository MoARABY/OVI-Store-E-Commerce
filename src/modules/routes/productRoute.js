const {createProductValidator,updateProductValidator,checkIdValidator,setImageUrl} = require('../validators/productValidator')
// const {verifyRole} = require('../../guards/isAuthorized')
const {createProduct,getProduct,getProducts,updateProduct,deleteProduct} = require('../controllers/productController')
const {upload,uploads} = require('../../middlewares/uploadImage')
const router = require('express').Router()


router.get('/',getProducts)
router.post('/',upload.fields([{name:'images',maxCount:5},{name:'productImage',maxCount:1}]),uploads,createProductValidator,createProduct)
router.get('/:id',checkIdValidator,getProduct)
router.put('/:id',updateProductValidator,updateProduct)
router.delete('/:id',checkIdValidator,deleteProduct)


module.exports = router