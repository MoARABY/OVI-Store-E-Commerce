const mongoose = require('mongoose');

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
        minlength: [20, 'Too short product description'],
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
    },
    },{ timestamps: true }
);

productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'productId',
    localField: '_id',
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

productSchema.post('findOne', async function (doc, next) {
    if (!doc) return next();
    await doc.populate({path: 'reviews', select: 'ratings title -productId'})
    next();
});

productSchema.pre(/^find/, function (next) {
    this.populate([
        {path: 'category',select: 'name -_id',},
        {path: 'subcategories', select: 'name -_id'},
        {path: 'brand', select: 'name -_id'}]);
    next();
});


const setImageURL= (doc)=>{
    if(doc.productImage){
        doc.productImage = `${process.env.BASE_URL}/products/${doc.productImage}`
    }
    if (doc.images.length > 0) {
        doc.images = doc.images.map((image) => `${process.env.BASE_URL}/products/${image}`);
    }
}

productSchema.post('init', (doc) => {
    setImageURL(doc);
});

productSchema.post('save', (doc) => {
    setImageURL(doc);
});

module.exports = mongoose.model('Product',productSchema)