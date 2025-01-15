const {createCategory,getCategories,getCategory,updateCategory,deleteCategory} = require('../controllers/categoryController')
const {getCategoryValidator,createCategoryValidator,updateCategoryValidator,deleteCategoryValidator} = require('../validators/categoryValidator')
const subCategories = require('./subCategoryRoute');
const {upload, imageResize} = require('../middlewares/uploadImages')
const {verifyRole} = require('../middlewares/verifyToken')

const router=require('express').Router()



router.route('/')
.get(getCategories)
.post(verifyRole('admin'),upload.single('categoryImage'),imageResize,createCategoryValidator,createCategory)

router.route('/:id')
.get(getCategoryValidator,getCategory)
.put(verifyRole('admin'),upload.single('categoryImage'),imageResize,updateCategoryValidator,updateCategory)
.delete(verifyRole('admin'),deleteCategoryValidator,deleteCategory)


router.use('/:categoryId/subcategories', subCategories);



module.exports=router
