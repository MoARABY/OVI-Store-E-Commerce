const mongoose=require('mongoose')



const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'Category name must be unique'],
        required: [true, 'Please enter category name'],
        minlength: [3, 'Category name must be at least 3 characters'],
        maxlength: [32, 'Category name cannot exceed 32 characters']
    },
    slug: {
        type: String,
        lowercase: true,
    },
    categoryImage: {
        type: String,
        default: 'https://via.placeholder.com/150'
    }
} ,{ timestamps: true })

categorySchema.post('init', (doc) => {
    if(doc.categoryImage) {
        doc.categoryImage = `${process.env.BASE_URL}/categories/${doc.categoryImage}`
    }
});

categorySchema.post('save', (doc) => {
    if(doc.categoryImage) {
        doc.categoryImage = `${process.env.BASE_URL}/categories/${doc.categoryImage}`
    }
})


module.exports = mongoose.model('Category',categorySchema)
