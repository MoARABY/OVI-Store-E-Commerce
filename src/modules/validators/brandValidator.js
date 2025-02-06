const {check} = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')



const createBrandValidator = [
    check('name').notEmpty().withMessage('Brand nama is required')
    .isLength({ min: 3 })
    .withMessage('Too short Brand name')
    .isLength({ max: 32 })
    .withMessage('Too long Brand name')
    .custom((val,{req})=>{
        req.body.slug = slugify(val)
        return true
    })
    ,validatorMiddleware
]

const checkIdValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id format'),
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


module.exports = {createBrandValidator,checkIdValidator,updateBrandValidator}