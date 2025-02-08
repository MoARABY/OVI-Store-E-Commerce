const {setImageUrl,createCategoryValidator,checkIdValidator,updateCategoryValidator} = require('../validators/categoryValidator')
const {verifyRole} = require('../../guards/isAuthorized')
const {createCategory,getCategory,getCategories,updateCategory,deleteCategory} = require('../controllers/categoryController')
const subCategories = require('./subCategoryRoute')
const {upload} = require('../../middlewares/uploadImage')
const router = require('express').Router()


router.get('/',verifyRole('admin','user'),getCategories)
router.post('/',verifyRole('admin','manager'),upload.single('categoryImage'),setImageUrl,createCategoryValidator,createCategory)
router.get('/:id',verifyRole('user'),checkIdValidator,getCategory)
router.put('/:id',verifyRole('admin','manager'),updateCategoryValidator,updateCategory)
router.delete('/:id',verifyRole('admin','manager'),checkIdValidator,deleteCategory)

router.use('/:categoryId/subCategories',subCategories)


module.exports = router