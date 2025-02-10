const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    cartItems: [{
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
        },
        quantity: {
            type: Number,
            default: 1,
        },
        color: String,
        price: Number,
    },
    ],
    totalCartPrice: Number,
    totalPriceAfterDiscount: Number,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    coupon: {
        type: mongoose.Schema.ObjectId,
        ref: 'Coupon',
    },
},{ timestamps: true }
);


cartSchema.pre(/^find/,function(next){
    this.populate([{path:'user',select:'name'},{path:'coupon',select:'title discount'}])
    next()
})


module.exports = mongoose.model('Cart', cartSchema);