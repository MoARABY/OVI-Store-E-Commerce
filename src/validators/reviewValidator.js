const {check,body} = require('express-validator')
const asyncHandler = require('express-async-handler')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const productModel = require('../models/productModel')
const reviewModel = require('../models/reviewModel')
const apiError = require('../utils/apiError')




const createReviewValidator = [
    body('ratings').notEmpty().withMessage('Review rate is required')
    .isFloat({min:1,max:5}).withMessage('Invalid rate value'),

    body('productId').notEmpty().withMessage('Review productId is required')
    .isMongoId().withMessage('Invalid productId format')
    .custom(asyncHandler(async (val)=>{
        const product = await productModel.findById(val)
        if(!product){
            throw new apiError('Product Not Found',404)
        }}))
    .custom(asyncHandler(async (val,{req})=>{
        const review = await reviewModel.findOne({productId:val,userId:req.user.userId})
        if(review){
            throw new apiError('You Have Already Reviewed This Product',400)}
    }))
    ,validatorMiddleware
]

const getReviewValidator = [
    check('id').isMongoId().withMessage('Invalid Review id format'),
    validatorMiddleware
]

const updateReviewValidator = [
    check('id').isMongoId().withMessage('Invalid Review id format')
    .custom(asyncHandler(async (val,{req})=>{
        const review = await reviewModel.findById(val)
        if(!review){
            throw new apiError('Review Not Found',404)
        }
        if(review.userId._id.toString() !== req.user.userId){
            throw new apiError('You Are Not Allowed To Update This Review',403)
        }
    }))
    ,
    body('ratings').optional().isFloat({min:1.0,max:5.0}).withMessage('Invalid rate value'),
    body('productId').optional().isMongoId().withMessage('Invalid productId format'),
    validatorMiddleware
]

const deleteReviewValidator = [
    check('id').isMongoId().withMessage('Invalid Review id format')
    .custom(asyncHandler(async (val,{req})=>{
        const review = await reviewModel.findById(val)
        if(!review){
            throw new apiError('Review Not Found',404)
        }
        if(review.role =='user' && review.userId._id.toString() !== req.user.userId){
            throw new apiError('You Are Not Allowed To Delete This Review',403)
        }}))
    ,validatorMiddleware
]

module.exports = {createReviewValidator,getReviewValidator,updateReviewValidator,deleteReviewValidator}