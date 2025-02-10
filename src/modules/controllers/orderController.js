const asyncHandler = require('express-async-handler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');



const createOrder = asyncHandler(async (req, res) => {
    
})

const getOrders = asyncHandler(async (req, res) => {
    const orders = await orderModel.find({})
    orders.length > 0 ? res.status(200).json(orders) : res.status(404).json({msg: 'Orders not found'})
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