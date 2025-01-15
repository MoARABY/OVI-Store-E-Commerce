const {check,body} = require('express-validator')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const couponModel = require('../models/couponModel')
const ApiError = require('../utils/apiError')


const createCouponValidator = [
    body('name').notEmpty().withMessage('Coupon name is required')
    .custom(async (value,{req})=>{
        const coupon = await couponModel.findOne({name:value})
        if(coupon){
            throw new ApiError('Coupon name already exist',400)
        }
        return true})
    ,
    body('expire').notEmpty().withMessage('Coupon expire time is required'),
    body('discount').notEmpty().withMessage('Coupon discount value is required')
    ,validatorMiddleware
]

const getCouponValidator = [
    check('id').isMongoId().withMessage('Invalid Coupon id format'),
    validatorMiddleware
]

const updateCouponValidator = [
    check('id').isMongoId().withMessage('Invalid Coupon id format'),
    validatorMiddleware
]

const deleteCouponValidator = [
    check('id').isMongoId().withMessage('Invalid Coupon id format'),
    validatorMiddleware
]

module.exports = {createCouponValidator,getCouponValidator,updateCouponValidator,deleteCouponValidator}