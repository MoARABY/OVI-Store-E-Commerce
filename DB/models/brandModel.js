const mongoose = require('mongoose')



const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Brand required'],
        unique: [true, 'Brand must be unique'],
        minlength: [3, 'Too short Brand name'],
        maxlength: [32, 'Too long Brand name'],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/150'
    }
},{ timestamps: true })


brandSchema.post('init', (doc) => {
    if(doc.brandImage) {
        doc.brandImage = `${process.env.BASE_URL}/brands/${doc.brandImage}`
    }
});

brandSchema.post('save', (doc) => {
    if(doc.brandImage) {
        doc.brandImage = `${process.env.BASE_URL}/brands/${doc.brandImage}`
    }
})
module.exports = mongoose.model('Brand',brandSchema)