const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel')





const getWishlist = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user.userId).populate('wishlist')
    user ?  res.status(200).json({length:user.wishlist.length,data:user.wishlist}) : res.status(400).json("User not found")
})

const addToWishlist = asyncHandler(async (req, res) => {

    // push a product id to the wishlist array although it exist
    // addToSet
    const user = await userModel.findByIdAndUpdate(req.user.userId,{$addToSet:{wishlist:req.body.productId}},{new:true})
    user ?  res.status(200).json('produt added to wishlist successfully') : res.status(400).json("User not found")
})

const removeFromWishlist = asyncHandler(async (req, res) => {
    const user = await userModel.findByIdAndUpdate(req.user.userId,{$pull:{wishlist:req.params.id}},{new:true})
    user ?  res.status(200).json({msg:'product removed from wishlist successfully',data:user.wishlist}) : res.status(400).json("User not found")
})

module.exports = {getWishlist,addToWishlist,removeFromWishlist}