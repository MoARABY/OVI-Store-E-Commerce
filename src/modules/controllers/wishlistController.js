const userModel = require('../../../DB/models/userModel')
const productModel = require('../../../DB/models/productModel')
const apiError = require('../../utils/apiError')
const asyncHandler = require('express-async-handler')



const getWishlist  = asyncHandler(async (req,res)=>{
    const user = await userModel.findById(req.loggedUser.userId).populate('wishlist')
    user ?  res.status(200).json({length:user.wishlist.length,data:user.wishlist}) : res.status(400).json("User not found")
})

const addToWishlist = asyncHandler(async (req,res)=>{
    if(!req.body.productId) return res.status(400).json('produtId must be provided')
    const product = await productModel.findById(req.body.productId)
    if(!product) {
        throw new apiError('product not found',404)
    }
    const wishlist = await userModel.findByIdAndUpdate(req.loggedUser.userId,{$addToSet:{wishlist:req.body.productId}},{new:true})
    wishlist ?  res.status(200).json('product added to wishlist successfully') : res.status(400).json("User not found")
})

const removeFromWishlist = asyncHandler(async (req,res)=>{
    const wishlist = await userModel.findByIdAndUpdate(req.loggedUser.userId,{$pull:{wishlist:req.params.id}},{new:true})
    wishlist ?  res.status(200).json({msg:'product removed from wishlist successfully'}) : res.status(400).json("User not found")
})


module.exports = {getWishlist,addToWishlist,removeFromWishlist}