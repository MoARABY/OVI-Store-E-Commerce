const {check,body} = require('express-validator')
const slugify = require('slugify')

const categoryModel = require('../../../DB/models/categoryModel')
const brandModel = require('../../../DB/models/brandModel')
const subCategoryModel = require('../../../DB/models/subCategoryModel')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const apiError = require('../../utils/apiError')



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
    .isLength({ min: 10 })
    .withMessage('Too short Product description'),

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
    .custom(async (categoryId)=>{
    const category = await categoryModel.findById(categoryId)
        if(!category) {
            throw new apiError('Invalid category Id',400)
        }
    })
    ,check('subcategories').isMongoId().withMessage('invalid id format')

    // check if ids is valid, so we should compare with db ids
    .custom(async (subCategoriesIds)=>{
        const idsArray = Array.isArray(subCategoriesIds)?subCategoriesIds:[subCategoriesIds]
        const result = await subCategoryModel.find({_id:{$exists:true, $in:idsArray}})
        if(result.length !== idsArray.length || result.length < 1) {
            throw new apiError('invalid subcategories ids',400)
        }
    })
    .custom(async (val,{req})=>{
        const idsArray = Array.isArray(val)?val:[val]
        const categories = await subCategoryModel.find({category:req.body.category},{_id:1})
        if(categories.length > 0){
        const transformIds = categories.map(doc=>doc._id.toString())
        const checker = idsArray.every(id=>transformIds.includes(id))
        if(!checker) {
            throw new apiError('Subcategory must belong to the category',400)
        }
        }
    })








    ,check('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('ratingsAverage must be a number')
    .isLength({ min: 1 })
    .withMessage('Rating must be above or equal 1.0')
    .isLength({ max: 5 })
    .withMessage('Rating must be below or equal 5.0'),

    check('brand').optional()
    .isMongoId().withMessage('Invalid ID format')
    .custom(async(brandId)=>{
        const brand = await brandModel.findById(brandId)
        if(!brand) throw new apiError('invalid brand id',400)
        
            return true
    }),

    check('colors')
    .optional()
    .isArray()
    .withMessage('availableColors should be array of string'),

    // check('productImage').notEmpty().withMessage('Product imageCover is required'),

    check('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage('ratingsQuantity must be a number')
    
    ,validatorMiddleware
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

const checkIdValidator = [
    check('id').isMongoId().withMessage('Invalid product id format'),
    validatorMiddleware
]

const setImageUrl = (req,res,next)=>{
    if(req.file) req.body.image = req.file.path
    next()
}


module.exports = {createProductValidator,updateProductValidator,checkIdValidator,setImageUrl}
