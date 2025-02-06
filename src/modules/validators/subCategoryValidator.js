const {check,body} = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const categoryModel = require('../../../DB/models/categoryModel')
const apiError = require('../../utils/apiError')



const createSubCategoryValidator = [
    check('name').notEmpty().withMessage('SubCategory nama is required')
    .isLength({ min: 3 })
    .withMessage('Too short SubCategory name')
    .isLength({ max: 32 })
    .withMessage('Too long SubCategory name')    .custom((val,{req})=>{
        req.body.slug = slugify(val)
        return true
    }),
    body('category').notEmpty().withMessage('sub category must belong to category')
    .isMongoId().withMessage('Invalid Subcategory id format')
    .custom(async(val)=>{
        const category = await categoryModel.findById(val)
        if (!category) {
            throw new apiError('Invalid category ID', 404);
        }
        
        return true;
    })
    ,validatorMiddleware
]

const setCategoryIdValue = (req,res,next)=>{
    if(!req.body.category) req.body.category = req.params.categoryId
    next()
}

const checkIdValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory id format')
    ,validatorMiddleware
]

const updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory id format'),
    check('name').optional()
    .custom((val,{req})=>{
        req.body.slug = slugify(val)
        return true
    }),
    validatorMiddleware
]

module.exports = {setCategoryIdValue,createSubCategoryValidator,checkIdValidator,updateSubCategoryValidator}