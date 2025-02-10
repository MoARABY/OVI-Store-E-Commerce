const asyncHandler = require('express-async-handler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const orderModel = require('../../../DB/models/orderModel')
const cartModel = require('../../../DB/models/cartModel')
const productModel = require('../../../DB/models/productModel')
const ApiFeatures = require('../../utils/apiFeatures')



const createOrder = asyncHandler(async (req, res) => {
    let taxPrice = 0
    let shippingPrice = 0

    // start by check if user have a cart
    const cart = await cartModel.findOne({user:req.loggedUser.userId})
    
    // A)
    if(!cart) {
        return res.status(400).json({ msg: 'user does not have a cart' })
    }
    // B)
    let cartPrice = 0
    cart.coupon ? cartPrice = +cart.totalPriceAfterDiscount : cartPrice = +cart.totalCartPrice
    let totalOrderPrice = cartPrice + taxPrice + shippingPrice
    // create cash order
    const cashOrder = await orderModel.create({
        user: req.loggedUser.userId,
        cartItems: cart.cartItems,
        shippingAddress: req.body.shippingAddress,
        totalOrderPrice: +totalOrderPrice,
        paymentMethodType: req.body.paymentMethodType
    })

    // update order sold and quantity
    if(cashOrder){
        const bulkOpt = cart.cartItems.map(item=>({
            updateOne: {
            filter:{ _id: item.product },
            update: { $inc: { quantity: -item.quantity , sold: +item.quantity } }
        }}))
        await productModel.bulkWrite(bulkOpt,{})
        await cartModel.findOneAndDelete({ user: req.loggedUser.userId })
        return res.status(201).json({msg: 'order created successfully', cashOrder})
    } else {
        return res.status(400).json({msg:'cannot create order'})
    }
})

const getOrders = asyncHandler(async (req, res) => {

    const countDocuments = await orderModel.countDocuments()
    const apiFeatures = new ApiFeatures(req.query,orderModel.find())
    .filter()
    .limitFields()
    .sort()
    .paginate(countDocuments)
    .search('orderModel')

    const {mongooseQuery,paginateFeatures } = apiFeatures
    const orders = await mongooseQuery
    orders.length > 0 ? res.status(200).json({length:orders.length,paginateFeatures,Data:orders}) : res.status(404).json({msg: 'Orders not found'})
})

const getLoggedUserOrders  = asyncHandler(async (req, res) => {
    const order = await orderModel.find({ user: req.loggedUser.userId })
    order.length > 0 ? res.status(200).json(order) : res.status(404).json({msg: 'Orders not found'})
})

const updateOrderStatus  = asyncHandler(async (req, res) => {
    const order = await orderModel.findById(req.params.id)
    if (!order) {
        return res.status(404).json({msg: 'Order not found'})
    }
    if (req.body.isPaid) {
        order.isPaid = true
        order.paidAt = Date.now()
    }
    if (req.body.isDelivered) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
    }
    const updatedOrder = await order.save()
    res.status(200).json({msg: 'Order updated successfully', updatedOrder})
})


const checkOutSession  = asyncHandler(async (req, res) => {
    
})

const createCardOrder  = asyncHandler(async (req, res) => {
    
})

const webhookCheckout  = asyncHandler(async (req, res) => {

})
module.exports = {createOrder, getOrders, getLoggedUserOrders,updateOrderStatus, checkOutSession, createCardOrder, webhookCheckout}