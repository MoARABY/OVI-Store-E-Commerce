const {check} = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')



const createCouponValidator = [
    check('name').notEmpty().withMessage('Coupon title is required')
    ,check('expire').notEmpty().withMessage('Coupon expire time required')
    ,check('discount').notEmpty().withMessage('Coupon must have discount value')
    ,validatorMiddleware
]

const checkIdValidator = [
    check('id').isMongoId().withMessage('Invalid Coupon id format'),
    validatorMiddleware
]

module.exports = {createCouponValidator,checkIdValidator}