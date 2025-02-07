const productModel = require('../../../DB/models/productModel')
const asyncHandler = require('express-async-handler')




const createProduct = asyncHandler(async(req,res)=>{
    const product = await productModel.create(req.body)
    product ? res.status(201).json({msg:'product created succesffully',product}) : res.status(400).json('can not create product')
})

const getProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const product = await productModel.findById(id)
    product ? res.status(200).json(product) : res.status(400).json('cannot find product')
})

const getProducts = asyncHandler(async(req,res)=>{



    const mongooseQuery = productModel.find()


    // paginate
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const skip = (page-1) * limit

    mongooseQuery .limit(limit).skip(skip)

    // sorting
    if (req.query.sort){
        const sortBy = req.query.sort.toString().split(',').join(' ')
        mongooseQuery.sort(sortBy)
    } else {
        mongooseQuery.sort('-createdAt')
    }

    // limitation
    if(req.query.fields){
        const fields = req.query.fields.toString().split(',').join(' ')
        mongooseQuery.select(fields)
    } else {
        mongooseQuery.select('-__v')
    }

    // filter
    let filterObj = {...req.query}
    const features = ['page','limit','sort','keyword','fields']
    features.forEach(ele => delete filterObj[ele])
    let queryStr = JSON.stringify(filterObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    mongooseQuery.find(JSON.parse(queryStr));

    // search 
    if(req.query.keyword){
        const keywords = req.query.keyword
        mongooseQuery.find({$or:[
            {title:{$regex:keywords, $options : 'i'}},
            {description:{$regex:keywords, $options : 'i'}}]})
    }  else {
        mongooseQuery.find()
    }
    


    const products = await mongooseQuery
    products ? res.status(200).json({page,limit,totalProducts:products.length,data:products}) : res.status(400).json('cannot find products')
})

const updateProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const product = await productModel.findByIdAndUpdate(id,req.body,{new:true})
    product ? res.status(200).json({msg:'product updated succesffuly',product}) : res.status(400).json('cannot find product')
})

const deleteProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const product = await productModel.findByIdAndDelete(id,req.body,{new:true})
    product ? res.status(200).json({msg:'product deleted succesffuly'}) : res.status(400).json('cannot find product')
})

module.exports = {createProduct,getProduct,getProducts,updateProduct,deleteProduct}