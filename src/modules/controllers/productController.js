const productModel = require('../../../DB/models/productModel')
const ApiFeature = require('../../utils/apiFeatures')
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


    const countDocuments = await productModel.countDocuments()
    const apiFeatures = new ApiFeature(req.query,productModel.find())
    .filter()
    .limitFields()
    .sort()
    .paginate(countDocuments)
    .search('productModel')

    const {mongooseQuery,paginateFeatures } = apiFeatures

    const products = await mongooseQuery
    products ? res.status(200).json({length:products.length,paginateFeatures,Data:products}) : res.status(400).json('cannot find products')
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