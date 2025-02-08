const reviewModel = require('../../../DB/models/reviewModel')
const asyncHandler = require('express-async-handler')
const ApiFeatures = require('../../utils/apiFeatures')



const createReview = asyncHandler(async(req,res)=>{
    if(req.params.productId) req.body.productId = req.params.productId
    req.body.userId = req.loggedUser.userId
    const review = await reviewModel.create(req.body)
    review ? res.status(201).json('review added successfuly') : res.status(400).json('review cannot added')
})

const getReview = asyncHandler(async(req,res)=>{

    const {id} = req.params
    let filterObj = {_id:id}
    if(req.params.productId) {
        filterObj = {_id:id,productId:req.params.productId}
    }

    const review = await reviewModel.findOne(filterObj)
    review ? res.status(200).json(review) : res.status(404).json('Review Not Found')
})

const getReviews = asyncHandler(async(req,res)=>{

    let filterObj = {}
    if(req.params.productId) filterObj = {productId:req.params.productId}

    const countDocuments = await reviewModel.countDocuments()
    const apiFeatures = new ApiFeatures(req.query,reviewModel.find(filterObj))
    .filter()
    .limitFields()
    .sort()
    .paginate(countDocuments)
    .search('reviewModel')

    const {mongooseQuery,paginateFeatures } = apiFeatures
    const reviews = await mongooseQuery
    reviews ? res.status(200).json({length:reviews.length,paginateFeatures,Data:reviews}) : res.status(404).json('No Reviews Found')
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