const asyncHandler = require('express-async-handler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const orderModel = require('../../../DB/models/orderModel')
const cartModel = require('../../../DB/models/cartModel')
const productModel = require('../../../DB/models/productModel')
const ApiFeatures = require('../../utils/apiFeatures')




// implement cash order operations
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





// implement card order operations
const createOnlineOrder  = asyncHandler(async (session) => {
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

const checkOutSession  = asyncHandler(async (req, res) => {

    // get order total price
    let taxPrice = 0
    let shippingPrice = 0
    const cart = await cartModel.findOne({ user: req.loggedUser.userId })
    if (!cart) {
        res.status(400).json({ msg: 'Cart not found' })
    }
    let cartPrice = 0
    cart.coupon ? cartPrice = +cart.totalPriceAfterDiscount : cartPrice = +cart.totalCartPrice
    let totalOrderPrice = cartPrice + taxPrice + shippingPrice

    // start create stripe session
    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: 'egp',
                product_data: {
                    name: req.loggedUser.name,
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
    customer_email: req.loggedUser.email,
    metadata: req.body.shippingAddress,
    });
    session ? res.status(200).json({session}) : res.status(400).json({msg: 'Session not created'})
})


const webhookCheckout  = asyncHandler(async (req, res) => {
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
        createOnlineOrder(event.data.object);
    }

    res.status(200).json({ received: true });
})



module.exports = {createOrder, getOrders, getLoggedUserOrders,updateOrderStatus, checkOutSession, createOnlineOrder, webhookCheckout}