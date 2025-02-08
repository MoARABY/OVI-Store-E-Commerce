const {createProductValidator,updateProductValidator,checkIdValidator,setImageUrl} = require('../validators/productValidator')
const {verifyRole} = require('../../guards/isAuthorized')
const {createProduct,getProduct,getProducts,updateProduct,deleteProduct} = require('../controllers/productController')
const {upload,uploads} = require('../../middlewares/uploadImage')
const router = require('express').Router()


router.get('/',verifyRole('user','admin'),getProducts)
router.post('/',verifyRole('manager','admin'),upload.fields([{name:'images',maxCount:5},{name:'productImage',maxCount:1}]),uploads,createProductValidator,createProduct)
router.get('/:id',verifyRole('user'),checkIdValidator,getProduct)
router.put('/:id',verifyRole('manager','admin'),updateProductValidator,updateProduct)
router.delete('/:id',verifyRole('manager','admin'),checkIdValidator,deleteProduct)

module.exports = router