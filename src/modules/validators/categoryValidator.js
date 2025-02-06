const {check} = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')



const createCategoryValidator = [
    check('name').notEmpty().withMessage('category nama is required')
    .isLength({ min: 3 })
    .withMessage('Too short category name')
    .isLength({ max: 32 })
    .withMessage('Too long category name')
    .custom((val,{req})=>{
        req.body.slug = slugify(val)
        return true
    })
    ,validatorMiddleware
]

const checkIdValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware
]

const updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    check('name').optional()
    .custom((val,{req})=>{
        req.body.slug = slugify(val)
        return true
    }),
    validatorMiddleware
]
module.exports = {createCategoryValidator,checkIdValidator,updateCategoryValidator}