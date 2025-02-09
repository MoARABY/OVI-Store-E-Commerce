const {body,check} = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const productModel = require('../../../DB/models/productModel')
const reviewModel = require('../../../DB/models/reviewModel')
const apiError = require('../../utils/apiError')



const createReviewValidator = [
    body('ratings').notEmpty().withMessage('review must include rate')
    .isFloat({min:1,max:5}).withMessage('Invalid rate value')

    ,check('productId').notEmpty().withMessage('Review productId is required')
    .isMongoId().withMessage('Invalid productId format')
    .custom(async(val)=>{
        const product =  await productModel.findById(val)
        if(!product) {
            throw new apiError('product not found',404)
        }
    })
    .custom(async (val,{req})=>{
        const review = await reviewModel.find({productId:val,userId:req.loggedUser.userId})
        if( review.length>0 ) {
            throw new apiError('You Have Already Reviewed This Product',400)
        }

    })
    ,validatorMiddleware
]

const updateReviewValidator = [
    check('id').isMongoId().withMessage('Invalid Review id format')
    .custom(async (val,{req})=>{
        const review = await reviewModel.findById(val)
        if(!review){
            throw new apiError('Review Not Found',404)
        }
        if(review.userId._id.toString() !== req.loggedUser.userId){
            throw new apiError('You Are Not Allowed To Update This Review',403)
        }
    })
    ,
    body('ratings').optional().isFloat({min:1.0,max:5.0}).withMessage('Invalid rate value'),
    body('productId').optional().isMongoId().withMessage('Invalid productId format'),
    validatorMiddleware
]

const deleteReviewValidator = [
    check('id').isMongoId().withMessage('Invalid Review id format')
    .custom(async (val,{req})=>{
        const review = await reviewModel.findById(val)
        if(!review){
            throw new apiError('Review Not Found',404)
        }
        if(review.userId._id.toString() !== req.loggedUser.userId){
            throw new apiError('You Are Not Allowed To Delete This Review',403)
        }})
    ,validatorMiddleware
]

const checkIdValdidator = [
    check('id').isMongoId().withMessage('Invalid Review id format'),
    validatorMiddleware
]

module.exports = {createReviewValidator,updateReviewValidator,deleteReviewValidator,checkIdValdidator}