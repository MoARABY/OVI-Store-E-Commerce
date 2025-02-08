const {setImageUrl,createBrandValidator,checkIdValidator,updateBrandValidator} = require('../validators/brandValidator')
const {verifyRole} = require('../../guards/isAuthorized')
const  {createBrand,getBrand,getBrands,updateBrand,deleteBrand} = require('../controllers/brandController')
const {upload} = require('../../middlewares/uploadImage')
const router = require('express').Router()


router.get('/',verifyRole('user'),getBrands)
router.post('/',verifyRole('admin'),upload.single('brandImage'),setImageUrl,createBrandValidator,createBrand)
router.get('/:id',verifyRole('user'),checkIdValidator,getBrand)
router.put('/:id',verifyRole('admin','manager'),updateBrandValidator,updateBrand)
router.delete('/:id',verifyRole('admin','manager'),checkIdValidator,deleteBrand)


module.exports = router