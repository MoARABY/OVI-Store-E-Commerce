const mongoose = require('mongoose')



const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'sub category name must be unique'],
        required: [true, 'Please enter sub category name'],
        minlength: [3, 'sub category name must be at least 3 characters'],
        maxlength: [32, 'sub category name cannot exceed 32 characters']
    },
    slug: {
        type: String,
        lowercase: true,
    },
    category : {
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:[true,"SubCategory must be belong to parent category"]
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/150'
    }
} ,{ timestamps: true })

module.exports = mongoose.model('subCategory',subCategorySchema)