const mongoose = require('mongoose')


const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'subCategory name must be unique'],
        required: [true, 'Please enter subcategory name'],
        minlength: [3, 'subCategory name must be at least 3 characters'],
        maxlength: [32, 'subCategory name cannot exceed 32 characters']
    },
    slug: {
        type: String,
        lowercase: true,
    },
    subCategoryImage: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    category : {
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:[true,"SubCategory must be belong to parent category"]
    }
} ,{ timestamps: true })

subCategorySchema.pre(/^find/, function(next){
    this.populate({path:'category',select:'name _id'})
    next()
})

subCategorySchema.post('init', (doc) => {
    if(doc.subCategoryImage) {
        doc.subCategoryImage = `${process.env.BASE_URL}/subcategories/${doc.subCategoryImage}`
    }
});

subCategorySchema.post('save', (doc) => {
    if(doc.subCategoryImage) {
        doc.subCategoryImage = `${process.env.BASE_URL}/subcategories/${doc.subCategoryImage}`
    }
})

module.exports = mongoose.model('SubCategory',subCategorySchema)