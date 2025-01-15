const {check,body} = require('express-validator')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const categoryModel = require('../models/categoryModel')
const subCategoryModel = require('../models/subCategoryModel')
const asyncHandler = require('express-async-handler')
const apiError = require('../utils/apiError')
const slugify = require('slugify')


const createProductValidator = [
    check('title').notEmpty().withMessage('Product title is required')
    .isLength({ min: 3 })
    .withMessage('Too short Product name')
    .isLength({ max: 100 })
    .withMessage('Too long Product name').custom((val,{req})=>{
        req.body.slug = slugify(val)
        return true
    }),
    
    check('description').notEmpty().withMessage('Product description is required')
    .isLength({ min: 20 })
    .withMessage('Too short Product name'),
    
    check('quantity').notEmpty().withMessage('Product quantity is required').isNumeric()
    .withMessage('Product quantity must be a number'),

    check('price')
    .notEmpty()
    .withMessage('Product price is required')
    .isNumeric()
    .withMessage('Product price must be a number')
    .isLength({ max: 32 })
    .withMessage('To long price'),
    
    check('priceAfterDiscount')
    .optional()
    .isNumeric()
    .withMessage('Product price must be a number')
    .custom((val,{req})=>{
        if(req.body.price < val){
            throw new apiError('Discount price must be below the original price',400)
        }
        return true
    }),

    check('category')
    .notEmpty()
    .withMessage('Product must belong to category')
    .isMongoId()
    .withMessage('Invalid ID formate')
    .custom(asyncHandler(async (categoryId)=>{
    const category = await categoryModel.findById(categoryId)
        if(!category) {
            throw new apiError('Invalid category Id',400)
        }
    }))
    ,
    
    check('subcategories')
    .optional()
    .isMongoId()
    .withMessage('Invalid ID formate')
    .custom(asyncHandler(async (subcategoriesIds)=>{
    const idsArray = Array.isArray(subcategoriesIds) ? subcategoriesIds : [subcategoriesIds];
    const result = await subCategoryModel.find({_id:{$exists:true , $in:idsArray}})
        if(result.length !== idsArray.length || result.length < 1) {
            throw new apiError('Invalid subcategory Id 111',400)
        }
    }))
    .custom(asyncHandler(async(val,{req})=>{
        const idsArray = Array.isArray(val) ? val : [val];
        const categories = await subCategoryModel.find({category:req.body.category},{ _id: 1 })
        if(categories.length > 1){
            const subcategoriesDB = categories.map(subcategory=>subcategory._id.toString())
            const checker = idsArray.every(sub => subcategoriesDB.includes(sub))
            if(!checker) {
                throw new apiError('Subcategory must belong to the category',400)
            }
        }
    }))

    ,
    check('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('ratingsAverage must be a number')
    .isLength({ min: 1 })
    .withMessage('Rating must be above or equal 1.0')
    .isLength({ max: 5 })
    .withMessage('Rating must be below or equal 5.0'),

    check('brand').optional().isMongoId().withMessage('Invalid ID formate'),
    
    check('colors')
    .optional()
    .isArray()
    .withMessage('availableColors should be array of string'),

    check('productImage').notEmpty().withMessage('Product imageCover is required'),

    check('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage('ratingsQuantity must be a number'),
    
    
    validatorMiddleware
]

const getProductValidator = [
    check('id').isMongoId().withMessage('Invalid Product id format'),
    validatorMiddleware
]

const updateProductValidator = [
    check('id').isMongoId().withMessage('Invalid Product id format'),
    body('title').optional()
    .custom((val,{req})=>{
        req.body.slug = slugify(val)
        return true
    }),
    validatorMiddleware
]

const deleteProductValidator = [
    check('id').isMongoId().withMessage('Invalid Product id format'),
    validatorMiddleware
]

module.exports = {createProductValidator,getProductValidator,updateProductValidator,deleteProductValidator}