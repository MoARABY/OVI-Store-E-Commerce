const multer = require('multer')
const {CloudinaryStorage } = require('multer-storage-cloudinary');
const sharp = require('sharp')
const asyncHandler = require('express-async-handler')
const apiError = require('../utils/apiError')

// const storage = multer.memoryStorage({
//     destination: function (req, file, cb) {
//         let folder = './src/uploads/'
//         if(file.fieldname === 'brandImage'){
//             folder += 'brands/'
//         } else if(file.fieldname === 'productImage'){
//             folder += 'products/'
//         } else if(file.fieldname === 'categoryImage'){
//             folder += 'categories/'
//         } else if(file.fieldname === 'subCategoryImage'){
//             folder += 'subcategories/'
//         } else {
//             folder += 'others/'
//         }
//         cb(null, folder)
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1])
//     }
// })

const storage = multer.memoryStorage()

function fileFilter (req, file, cb) {
    if(file.mimetype.split('/')[0] === 'image'){
        cb(null, true)
    } else {
        cb(new apiError('Images Only!', 400), false)
    }
}

const imageResize = asyncHandler(async (req,res,next)=>{
    if(!req.file) return next()
        // let folder = './src/uploads/'
        let folder = './src/uploads/'
            if(req.file.fieldname === 'brandImage'){
                folder += 'brands/'
            } else if(req.file.fieldname === 'productImage'){
                folder += 'products/'
            } else if(req.file.fieldname === 'categoryImage'){
                folder += 'categories/'
            } else if(req.file.fieldname === 'subCategoryImage'){
                folder += 'subcategories/'
            } else {
                folder += 'others/'
            }
       const filename = req.file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9)+'.jpeg'
    await sharp(req.file.buffer)
        .resize(500,500)
        .toFormat('jpeg')
        .jpeg({quality:90})
        .toFile(`${folder}${filename}`)
        req.file.path = `${filename}`
        req.body[req.file.fieldname] = req.file.path
        next()
})


const imagesResize = asyncHandler(async (req,res,next)=>{
    if(!req.files) return next()
        let folder = `./src/uploads/products/`
            if(req.files.productImage){
                const filename = req.files.productImage[0].fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9)+'.jpeg'
                await sharp(req.files.productImage[0].buffer)
                    .resize(500,500)
                    .toFormat('jpeg')
                    .jpeg({quality:90})
                    .toFile(`${folder}${filename}`)
                    req.body.productImage = `${filename}`
                    next()
            }



            if(req.files.images){
                req.body.images = []
                await Promise.all(
                    req.files.images.map(async (file,index)=>{
                        const filename = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9)+`-${index+1}`+'.jpeg'
                        await sharp(file.buffer)
                        .resize(2000,1333)
                        .toFormat('jpeg')
                        .jpeg({quality:95})
                        .toFile(`${folder}${filename}`)
                        req.body.images.push(filename)
                    })
                ) 
        next()

}})
const upload = multer({ storage: storage ,fileFilter:fileFilter})

module.exports = {upload,imageResize,imagesResize}