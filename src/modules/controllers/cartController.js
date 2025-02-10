const userModel = require('../../../DB/models/userModel')
const cartModel = require('../../../DB/models/cartModel')
const couponModel = require('../../../DB/models/couponModel')

const asyncHandler = require('express-async-handler')



const calcCartTotalPrice = (cart)=>{

    let totalPrice = 0
    cart.cartItems.forEach((item)=>{
        totalPrice += item.price * item.quantity
    })
    cart.totalCartPrice = totalPrice
    cart.totalPriceAfterDiscount = undefined
    return cart
}

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
        // A)
        if (productExist >= 0) {
            cart.cartItems[productExist].quantity += +quantity
        // B)
        } else {
            cart.cartItems.push({product,quantity,color,price})
        }
    }
    
    // apply calc total cart price
    calcCartTotalPrice(cart)
    const updatedCart = await cart.save()
    updatedCart ? res.status(201).json({msg:'product added to cart successfully',updatedCart}) : res.status(400).json({message: 'Cart creation failed'})
})

const getLoggedUserCart = asyncHandler(async (req,res)=>{    
    const cart = await cartModel.find({user:req.loggedUser.userId})
    cart ? res.status(201).json(cart) : res.status(400).json({message: 'Cart not found'})
})

const updateCart = asyncHandler(async(req,res)=>{
    const {id} = req.params
    
    console.log(req.body)
    const Cart = await cartModel.findByIdAndUpdate(id, req.body, {new: true});
    Cart ? res.status(201).json(Cart) : res.status(400).json({message: 'Cart not found'})
})

const removeFromCart = asyncHandler(async (req,res)=>{
    const {color} = req.body
    if(!color){
        return res.status(400).json({message: 'Color is required'})
    }
    const existItem = await cartModel.findOne({
        user: req.loggedUser.userId,
        cartItems: { $elemMatch: { product: req.params.itemId,color } }
    });
    if(!existItem) {
        return res.status(201).json("cart does not contain this product") 
    }
    const cart = await cartModel.findOneAndUpdate({user : req.loggedUser.userId},{$pull: { cartItems: { product: req.params.itemId ,color:req.body.color} }}, {new: true});
    calcCartTotalPrice(cart)
    await cart.save()
    cart ? res.status(201).json("item removed Successfully from cart") : res.status(400).json({message: 'item not found'})
})

const clearCart  = asyncHandler(async (req,res)=>{
    const cart = await cartModel.findOneAndDelete({user : req.loggedUser.userId});
    cart ? res.status(201).json("Cart Cleared Successfully") : res.status(400).json({message: 'Cart not found'})
})

const applyCoupon = asyncHandler(async(req,res)=>{

    const coupon = await couponModel.findOne({name:req.body.coupon,expire:{$gte:Date.now()}})
    if(!coupon){
        return res.status(400).json({message: 'Coupon invalid or expired'})
    }

    const cart = await cartModel.findOne({user:req.loggedUser.userId})
    let totalPrice = cart.totalCartPrice
    let totalPriceAfterDiscount = totalPrice - (totalPrice * coupon.discount / 100)

    if(cart.coupon){
        return res.status(400).json({message: 'Coupon already applied'})
    }

    cart.totalPriceAfterDiscount = totalPriceAfterDiscount
    cart.coupon = coupon._id
    const updatedCart = await cart.save()
    updatedCart ? res.status(201).json(updatedCart) : res.status(400).json({message: 'Cart update failed'})
})

module.exports = {getLoggedUserCart,addToCart,updateCart,removeFromCart,clearCart,applyCoupon}