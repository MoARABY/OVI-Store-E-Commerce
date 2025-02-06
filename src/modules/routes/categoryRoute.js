const {createCategoryValidator,checkIdValidator,updateCategoryValidator} = require('../validators/categoryValidator')
// const {verifyRole} = require('../../guards/isAuthorized')
const {createCategory,getCategory,getCategories,updateCategory,deleteCategory} = require('../controllers/categoryController')
const subCategories = require('./subCategoryRoute')
const router = require('express').Router()


router.get('/',getCategories)
router.post('/',createCategoryValidator,createCategory)
router.get('/:id',checkIdValidator,getCategory)
router.put('/:id',updateCategoryValidator,updateCategory)
router.delete('/:id',checkIdValidator,deleteCategory)
router.use('/:categoryId/subCategories',subCategories)


module.exports = router