const multer = require('multer')
const cloudinary = require('../config/cloudinaryConfig')
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const asyncHandler = require('express-async-handler');


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        let folder = 'others'
        if(file.fieldname === 'brandImage'){
                folder = 'brands'
            } else if(file.fieldname === 'productImage'){
                folder = 'products'
            } else if(file.fieldname === 'categoryImage'){
                folder = 'categories'
            } else if(file.fieldname === 'subCategoryImage'){
                folder = 'subcategories'
            }        


        const publicId = `${file.fieldname}-${Date.now()}`;
        return {
            folder,
            public_id: publicId,
            allowedFormats: ['jpeg', 'png', 'jpg'],
            format: 'jpeg',
            transformation: [
                { width: 500, height: 500, crop: 'fill' },
                { quality: 'auto' }, 
            ],
        }
    }
})

const uploads = asyncHandler(async (req, res, next) => {
    if (!req.files) return next();

    req.body.images = [];

    if (req.files.productImage) {
        req.body.productImage = req.files.productImage[0].path; // Store Cloudinary URL
    }

    if (req.files.images) {
        req.body.images = req.files.images.map(file => file.path); // Store Cloudinary URLs
    }

    next();
});


const upload = multer({ storage: storage});


module.exports = {upload,uploads}



