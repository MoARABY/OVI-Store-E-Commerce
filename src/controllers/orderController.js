const asyncHandler = require('express-async-handler');
const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


const createOrder = asyncHandler(async (req, res) => {
    let taxPrice = 0
    let shippingPrice = 0
    const cart = await cartModel.findOne({ user: req.user.userId })
    if (!cart) {
        res.status(400).json({ msg: 'Cart not found' })
    }
    let cartPrice = 0
    cart.coupon ? cartPrice = +cart.totalPriceAfterDiscount : cartPrice = +cart.totalCartPrice
    let totalOrderPrice = cartPrice + taxPrice + shippingPrice
    const order = await orderModel.create({
        user: req.user.userId,
        cartItems: cart.cartItems,
        shippingAddress: req.body.shippingAddress,
        totalOrderPrice: totalOrderPrice,
        paymentMethodType: req.body.paymentMethodType
    })
    if (order) {
        const bulkOpt = cart.cartItems.map(item=>({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantity , sold: +item.quantity } }
            }
    }))
        await productModel.bulkWrite(bulkOpt,{})
        await cartModel.findOneAndDelete({ user: req.user.userId })
        res.status(201).json({msg: 'Order created successfully', order})
    }

})

const getOrders = asyncHandler(async (req, res) => {
    const orders = await orderModel.find({})
    orders ? res.status(200).json(orders) : res.status(404).json({msg: 'Orders not found'})
})

const getLoggedUserOrders = asyncHandler(async (req, res) => {
    if (req.user.role === 'user') {
        const order = await orderModel.find({ user: req.user.userId })
        order ? res.status(200).json(order) : res.status(404).json({msg: 'Orders not found'})
    } else {
        res.status(401).json({msg: 'Admin can not create orders'})
    }
})

const updateOrderStatus = asyncHandler(async (req, res) => {
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


const checkOutSession = asyncHandler(async (req, res) => {
    let taxPrice = 0
    let shippingPrice = 0
    const cart = await cartModel.findOne({ user: req.user.userId })
    if (!cart) {
        res.status(400).json({ msg: 'Cart not found' })
    }
    let cartPrice = 0
    cart.coupon ? cartPrice = +cart.totalPriceAfterDiscount : cartPrice = +cart.totalCartPrice
    let totalOrderPrice = cartPrice + taxPrice + shippingPrice

    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: 'egp',
                product_data: {
                    name: 'Order',
                },
                unit_amount: totalOrderPrice * 100,
            },
            quantity: 1,
        },
    ],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/api/v1/orders`,
    cancel_url: `${req.protocol}://${req.get('host')}/api/v1/cart`,
    client_reference_id: cart._id.toString(),
    customer_email: req.user.email,
    metadata: req.body.shippingAddress,
    });
    session ? res.status(200).json({session}) : res.status(400).json({msg: 'Session not created'})

})

const createCardOrder = asyncHandler(async (session) => {
    const cartId = session.client_reference_id;
    const shippingAddress = session.metadata;
    const orderPrice = session.amount_total / 100;

    const cart = await cartModel.findById(cartId);
    const user = await userModel.findOne({ email: session.customer_email });

    const order = await orderModel.create({
        user: user._id,
        cartItems: cart.cartItems,
        shippingAddress,
        totalOrderPrice: orderPrice,
        isPaid: true,
        paidAt: Date.now(),
        paymentMethodType: 'card',
    });
    if (order) {
        const bulkOption = cart.cartItems.map((item) => ({
        updateOne: {
            filter: { _id: item.product },
            update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
        },
    }));
        await productModel.bulkWrite(bulkOption, {});
        await cartModel.findByIdAndDelete(cart._id);
    }
})

const webhookCheckout = asyncHandler(async (req, res, next) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === 'checkout.session.completed') {
        createCardOrder(event.data.object);
    }

    res.status(200).json({ received: true });
});

module.exports = {createOrder, getOrders, getLoggedUserOrders,updateOrderStatus, checkOutSession, createCardOrder, webhookCheckout} 