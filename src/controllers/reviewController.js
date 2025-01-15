const asyncHandler = require('express-async-handler')
const reviewModel = require('../models/reviewModel')





const createReview = asyncHandler(async(req,res)=>{
    req.body.userId = req.user.userId
    const review = await reviewModel.create(req.body)
    review ? res.status(201).json(review) : res.status(400).json('Invalid Review Data')
})

const geteReview = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const review = await reviewModel.findById(id)
    review ? res.status(200).json(review) : res.status(404).json('Review Not Found')
})

const getReviews = asyncHandler(async(req,res)=>{
    const reviews = await reviewModel.find()
    reviews ? res.status(200).json(reviews) : res.status(404).json('No Reviews Found')
})

const updateReview = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const review = await reviewModel.findByIdAndUpdate(id,req.body,{new:true})
    await review.save()
    review ? res.status(200).json(review) : res.status(404).json('Review Not Found')
})

const deleteReview = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const review = await reviewModel.findByIdAndDelete(id)
    review ? res.status(204).json('Review Deleted Successfully') : res.status(404).json('Review Not Found')
})


const getProductReviews = asyncHandler(async(req,res)=>{
    let filtrObj = {}
    if(req.params.productId) filtrObj = {productId:req.params.productId}
    const reviews = await reviewModel.find(filtrObj)
    reviews ? res.status(200).json(reviews) : res.status(404).json('No Reviews Found')
})

const getProductReview = asyncHandler(async(req,res)=>{
    const {productId,reviewId} = req.params
    const review = await reviewModel.findOne({productId,reviewId})
    review ? res.status(200).json(review) : res.status(404).json('Review Not Found')
})

const createProductReview = asyncHandler(async(req,res)=>{
    req.body.userId = req.user.userId
    req.body.productId = req.params.productId
    const review = await reviewModel.create(req.body)
    review ? res.status(201).json(review) : res.status(400).json('Invalid Review Data')
})


module.exports = {createReview,geteReview,getReviews
    ,updateReview,deleteReview,getProductReviews,getProductReview,createProductReview}