const {createBrand,getBrands,getBrand,updateBrand,deleteBrand} = require('../controllers/brandController')
const {createBrandValidator,getBrandValidator,updateBrandValidator,deleteBrandValidator} = require('../validators/brandValidator')
const {upload,imageResize} = require('../middlewares/uploadImages')
const {verifyRole} = require('../middlewares/verifyToken')
const router=require('express').Router()



router.route('/')
.get(verifyRole('user','admin'),getBrands)
.post(verifyRole('admin'),upload.single('brandImage'),imageResize,createBrandValidator,createBrand)

router.route('/:id')
.get(getBrandValidator,getBrand)
.put(verifyRole('admin'),upload.single('brandImage'),imageResize,updateBrandValidator,updateBrand)
.delete(verifyRole('admin'),deleteBrandValidator,deleteBrand)


module.exports = router