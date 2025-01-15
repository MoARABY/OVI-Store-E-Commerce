const {createProduct,getProducts,getProduct,updateProduct,deleteProduct} = require('../controllers/productController')
const {createProductValidator,getProductValidator,updateProductValidator,deleteProductValidator} = require('../validators/productValidator')
const {upload, imagesResize} = require('../middlewares/uploadImages')
const reviewRouter = require('./reviewRoute')
const {verifyRole} = require('../middlewares/verifyToken')


const router = require('express').Router()




router.route('/')
.get(getProducts)
.post(verifyRole('admin'),upload.fields([{name:'productImage',maxCount:1},{name:'images',maxCount:5}]),imagesResize,createProductValidator,createProduct)

router.route('/:id')
.get(getProductValidator,getProduct)
.put(verifyRole('admin'),updateProductValidator,updateProduct)
.delete(verifyRole('admin'),deleteProductValidator,deleteProduct)

router.use('/:productId/reviews', reviewRouter)

module.exports = router