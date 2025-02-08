const reviewModel = require('../../../DB/models/reviewModel')
const asyncHandler = require('express-async-handler')



const createReview = asyncHandler(async(req,res)=>{
    req.body.userId = req.loggedUser.userId
    const review = await reviewModel.create(req.body)
    review ? res.status(201).json('review added successfuly') : res.status(400).json('review cannot added')
})

const getReview = asyncHandler(async(req,res)=>{
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
    review ? res.status(200).json('Review Deleted Successfully') : res.status(404).json('Review Not Found')
})


module.exports = {createReview,getReview,getReviews,updateReview,deleteReview}