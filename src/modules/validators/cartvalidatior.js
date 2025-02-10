const {check,body} = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const productModel = require('../../../DB/models/productModel')
const apiError = require('../../utils/apiError')



const createCartValidator = [
    check('product').notEmpty().withMessage('product is required')
    .custom(async(val,{req})=>{
        const product = await productModel.findById(val)
        if(!product) {
            throw new apiError('product not found',404)
        }
        req.body.price = product.priceAfterDiscount
    }),
    check('color').notEmpty().withMessage('product color must be provided')
    ,validatorMiddleware
]

const removeFromCartValidator = [
    check('itemId').isMongoId().withMessage('Invalid product id format')
    .custom(async(val)=>{
        const item = await productModel.findById(val)
        if(!item) {
            throw new apiError('product not found',404)
        }
    }),
    validatorMiddleware
]

const updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    check('name').optional()
    .custom((val,{req})=>{
        req.body.slug = slugify(val)
        return true
    }),
    validatorMiddleware
]

module.exports = {createCartValidator,removeFromCartValidator,updateBrandValidator}