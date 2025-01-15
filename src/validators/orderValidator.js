const {check,body} = require('express-validator')
const validatorMiddleware = require('../middlewares/validatorMiddleware')

const createOrderValidator = [
    body('name').notEmpty().withMessage('Order name is required')
    .isLength({ min: 3 })
    .withMessage('Too short Order name')
    .isLength({ max: 32 })
    .withMessage('Too long Order name').custom((val,{req})=>{
        req.body.slug = slugify(val)
        return true
    }),validatorMiddleware
]

const getOrderValidator = [
    check('id').isMongoId().withMessage('Invalid Order id format'),
    validatorMiddleware
]

const updateOrderValidator = [
    check('id').isMongoId().withMessage('Invalid Order id format'),
    body('name').optional()
    .custom((val,{req})=>{
        req.body.slug = slugify(val)
        return true
    }),
    validatorMiddleware
]

const deleteOrderValidator = [
    check('id').isMongoId().withMessage('Invalid Order id format'),
    validatorMiddleware
]

module.exports = {createOrderValidator,getOrderValidator,updateOrderValidator,deleteOrderValidator}