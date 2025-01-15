const cartModel=require('../models/cartModel')
const productModel=require('../models/productModel')
const couponModel=require('../models/couponModel')
const asyncHandler=require('express-async-handler')




const calcTotalCartPrice = (cart) => {
    let totalPrice = 0
    cart.cartItems.forEach(item => {
        totalPrice += item.price * item.quantity
    })
    cart.totalCartPrice = totalPrice
    cart.totalPriceAfterDiscount = undefined
    return cart
}

const addToCart = asyncHandler(async (req,res) =>{
    const {quantity,productId,color} = req.body
    let cart = await cartModel.findOne({user:req.user.userId})
    const product = await productModel.findById(req.body.productId)
    if(!cart){
        cart =  await cartModel.create({user:req.user.userId,cartItems:[{product:productId,quantity,color:color,price:product.price}]})
    } else {
        const productExist = cart.cartItems.findIndex(p=>p.product == productId && p.color == color)
        if(productExist >= 0){
            cart.cartItems[productExist].quantity += +quantity
        } else {
            cart.cartItems.push({product:productId,quantity:quantity,color:color,price:product.price})
        }
    }
        calcTotalCartPrice(cart)
        const updatedCart = await cart.save()
        updatedCart ? res.status(201).json(updatedCart) : res.status(400).json({message: 'Cart creation failed'})
})

const getLoggedUserCart = asyncHandler(async(req,res)=>{
    const cart = await cartModel.find({user:req.user.userId})
    cart ? res.status(201).json(cart) : res.status(400).json({message: 'Cart not found'})
})

const updateCart = asyncHandler(async(req,res)=>{
    const {id} = req.params
    
    console.log(req.body)
    const Cart = await cartModel.findByIdAndUpdate(id, req.body, {new: true});
    Cart ? res.status(201).json(Cart) : res.status(400).json({message: 'Cart not found'})
})

const removeItemFromCart = asyncHandler(async(req,res)=>{
    // const {id} = req.params
    const {color} = req.body
    if(!color){
        return res.status(400).json({message: 'Color is required'})
    }
    const cart = await cartModel.findOneAndUpdate({user : req.user.userId},{$pull: { cartItems: { product: req.params.itemId ,color:req.body.color} }}, {new: true});
    calcTotalCartPrice(cart)
    await cart.save()
    cart ? res.status(201).json("item removed Successfully from cart") : res.status(400).json({message: 'Cart not found'})
})

const clearCart = asyncHandler(async(req,res)=>{
    const cart = await cartModel.findOneAndDelete({user : req.user.userId});
    cart ? res.status(201).json("Cart Cleared Successfully") : res.status(400).json({message: 'Cart not found'})
})

const applyCoupon = asyncHandler(async(req,res)=>{
    // const {couponId} = req.body

    const coupon = await couponModel.findOne({name:req.body.coupon,expire:{$gte:Date.now()}})
    if(!coupon){
        return res.status(400).json({message: 'Coupon invalid or expired'})
    }

    const cart = await cartModel.findOne({user:req.user.userId})
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

module.exports={addToCart,getLoggedUserCart,updateCart,removeItemFromCart,clearCart,applyCoupon}