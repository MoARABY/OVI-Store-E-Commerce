const {setImageUrl,createBrandValidator,checkIdValidator,updateBrandValidator} = require('../validators/brandValidator')
const {verifyRole} = require('../../guards/isAuthorized')
const  {createBrand,getBrand,getBrands,updateBrand,deleteBrand} = require('../controllers/brandController')
const {upload} = require('../../middlewares/uploadImage')
const router = require('express').Router()


router.get('/',getBrands)
router.post('/',upload.single('brandImage'),setImageUrl,createBrandValidator,createBrand)
router.get('/:id',checkIdValidator,getBrand)
router.put('/:id',updateBrandValidator,updateBrand)
router.delete('/:id',checkIdValidator,deleteBrand)


module.exports = router