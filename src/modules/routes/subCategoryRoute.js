const {setImageUrl,setCategoryIdValue,createSubCategoryValidator,checkIdValidator,updateSubCategoryValidator} = require('../validators/subCategoryValidator')
const {verifyRole} = require('../../guards/isAuthorized')
const  {createSubCategory,getSubCategory,getSubCategories,updateSubCategory,deleteSubCategory} = require('../controllers/subCategoryController')
const {upload} = require('../../middlewares/uploadImage')
const router = require('express').Router({mergeParams:true})


router.get('/',getSubCategories)
router.post('/',setCategoryIdValue,upload.single('subCategoryImage'),setImageUrl,createSubCategoryValidator,createSubCategory)
router.get('/:id',checkIdValidator,getSubCategory)
router.put('/:id',updateSubCategoryValidator,updateSubCategory)
router.delete('/:id',checkIdValidator,deleteSubCategory)


module.exports = router