const {setImageUrl,setCategoryIdValue,createSubCategoryValidator,checkIdValidator,updateSubCategoryValidator} = require('../validators/subCategoryValidator')
const {verifyRole} = require('../../guards/isAuthorized')
const  {createSubCategory,getSubCategory,getSubCategories,updateSubCategory,deleteSubCategory} = require('../controllers/subCategoryController')
const {upload} = require('../../middlewares/uploadImage')
const router = require('express').Router({mergeParams:true})


router.get('/',verifyRole('admin','user'),getSubCategories)
router.post('/',verifyRole('admin','manager'),setCategoryIdValue,upload.single('subCategoryImage'),setImageUrl,createSubCategoryValidator,createSubCategory)
router.get('/:id',verifyRole('user'),checkIdValidator,getSubCategory)
router.put('/:id',verifyRole('admin','manager'),updateSubCategoryValidator,updateSubCategory)
router.delete('/:id',verifyRole('admin','manager'),checkIdValidator,deleteSubCategory)


module.exports = router