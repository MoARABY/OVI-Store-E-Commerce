const userModel = require('../../../DB/models/userModel')
const productModel = require('../../../DB/models/productModel')
const apiError = require('../../utils/apiError')
const asyncHandler = require('express-async-handler')



const getWishlist  = asyncHandler(async (req,res)=>{
    const user = await userModel.findById(req.loggedUser.userId).populate({path:'wishlist',select:'name price description images'})
    user ?  res.status(200).json({status:'success',message:'wishlist fetched successfully',data:user.wishlist}) : res.status(400).json({status:'fail',message:'User not found'})
})

const addToWishlist = asyncHandler(async (req,res)=>{
    if(!req.body.productId) return res.status(400).json({status:'fail',message:'productId must be provided'})
    const product = await productModel.findById(req.body.productId)
    if(!product) {
        throw new apiError('product not found',404)
    }
    const wishlist = await userModel.findByIdAndUpdate(req.loggedUser.userId,{$addToSet:{wishlist:req.body.productId}},{new:true})
    wishlist ?  res.status(200).json({status:'success',message:'product added to wishlist successfully'}) : res.status(400).json({status:'fail',message:'User not found'})
})

const removeFromWishlist = asyncHandler(async (req,res)=>{
    const wishlist = await userModel.findByIdAndUpdate(req.loggedUser.userId,{$pull:{wishlist:req.params.id}},{new:true})
    wishlist ?  res.status(200).json({status:'success',message:'product removed from wishlist successfully'}) : res.status(400).json({status:'fail',message:'User not found'})
})


module.exports = {getWishlist,addToWishlist,removeFromWishlist}