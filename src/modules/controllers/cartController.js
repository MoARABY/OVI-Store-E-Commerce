const userModel = require('../../../DB/models/userModel')
const cartModel = require('../../../DB/models/cartModel')
const asyncHandler = require('express-async-handler')


const addToCart  = asyncHandler(async (req,res)=>{
    const {product,color,quantity,price} = req.body

    // cart exist or not
    const cart = await cartModel.findOne({user:req.loggedUser.userId})

    //  A)
    if (!cart) {
        const newCart = await cartModel.create({user:req.loggedUser.userId,cartItems:[{product,quantity,color,price}]})
        return res.status(201).json({msg:'product added to cart successfully',newCart})
    //  B)
    } else {
        // product exist or not
        const productExist = cart.cartItems.findIndex(I=>I.product == product && I.color == color)
            console.log(productExist)
        // A)
        if (productExist >= 0) {
            cart.cartItems[productExist].quantity += +quantity
        // B)
        } else {
            cart.cartItems.push({product,quantity,color,price})
        }
    }
    
    const updatedCart = await cart.save()
    updatedCart ? res.status(201).json({msg:'product added to cart successfully',updatedCart}) : res.status(400).json({message: 'Cart creation failed'})
})

const getLoggedUserCart = asyncHandler(async (req,res)=>{    
    const cart = await cartModel.find({user:req.loggedUser.userId})
    cart ? res.status(201).json(cart) : res.status(400).json({message: 'Cart not found'})
})

const updateCart = asyncHandler(async (req,res)=>{
    const cart = await userModel.findByIdAndUpdate(req.loggedUser.userId,{$pull:{cart:req.params.id}},{new:true})
    cart ?  res.status(200).json({msg:'product removed from cart successfully'}) : res.status(400).json("User not found")
})

const removeFromCart = asyncHandler(async (req,res)=>{
    const cart = await userModel.findByIdAndUpdate(req.loggedUser.userId,{$pull:{cart:req.params.id}},{new:true})
    cart ?  res.status(200).json({msg:'product removed from cart successfully'}) : res.status(400).json("User not found")
})

const clearCart  = asyncHandler(async (req,res)=>{
    const cart = await cartModel.findOneAndDelete({user : req.loggedUser.userId});
    cart ? res.status(201).json("Cart Cleared Successfully") : res.status(400).json({message: 'Cart not found'})
})

const applyCoupon = asyncHandler(async(req,res)=>{

})

module.exports = {getLoggedUserCart,addToCart,removeFromCart,clearCart}