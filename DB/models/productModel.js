const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Too short product title'],
        maxlength: [100, 'Too long product title'],
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        minlength: [10, 'Too short product description'],
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
    },
    sold: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,
        max: [200000, 'Too long product price'],
    },
    priceAfterDiscount: {
        type: Number,
    },
    colors: [String],
    productImage: {
        type: String,
        // required: [true, 'Product Image cover is required'],
    },
    images: [String],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Product must be belong to category'],
    },
    subcategories: [{
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
    },
    ],
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand',
    },
    ratingsAverage: {
        type: Number,
        min: [1, 'Rating must be above or equal 1.0'],
        max: [5, 'Rating must be below or equal 5.0'],
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    }
},{timestamps:true})




module.exports = mongoose.model('Product',productSchema)