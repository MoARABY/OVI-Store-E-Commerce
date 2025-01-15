const router = require('express').Router({mergeParams:true})
const {createSubCategory,getSubCategories,getSubCategory,updateSubCategory,deleteSubCategory} = require('../controllers/subCategoryController')
const {getSubCategoryValidator,createSubCategoryValidator,setCategoryIdValue,updateSubCategoryValidator,deleteSubCategoryValidator} = require('../validators/subCategoryValidator')
const {upload, imageResize} = require('../middlewares/uploadImages')
const {verifyRole} = require('../middlewares/verifyToken')

router.route('/')
.get(getSubCategories)
.post(verifyRole('admin'),upload.single('subCategoryImage'),imageResize,createSubCategoryValidator,setCategoryIdValue,createSubCategory)

router.route('/:id')
.get(getSubCategory)
.put(verifyRole('admin'),upload.single('subCategoryImage'),imageResize,updateSubCategoryValidator,updateSubCategory)
.delete(verifyRole('admin'),deleteSubCategoryValidator,deleteSubCategory)


module.exports = router
