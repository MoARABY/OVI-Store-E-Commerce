const productModel = require('../../../DB/models/productModel')
const ApiFeature = require('../../utils/apiFeatures')
const asyncHandler = require('express-async-handler')




const createProduct = asyncHandler(async(req,res)=>{ 
    const product = await productModel.create(req.body)
    product ? res.status(201).json({status:'success',message:'product created succesffuly',data:product}) : res.status(400).json({status:'fail',message:'cannot create product'})
})

const getProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const product = await productModel.findById(id)
    product ? res.status(200).json({status:'success',message:'product found',data:product}) : res.status(400).json({status:'fail',message:'cannot find product'})
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
    products ? res.status(200).json({status:'success',message:'products found',length:products.length,paginateFeatures,data:products}) : res.status(400).json({status:'fail',message:'cannot find products'})
})

const updateProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const product = await productModel.findByIdAndUpdate(id,req.body,{new:true})
    product ? res.status(200).json({status:'success',message:'product updated succesffuly',data:product}) : res.status(400).json({status:'fail',message:'cannot find product'})
})

const deleteProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const product = await productModel.findByIdAndDelete(id,req.body,{new:true})
    product ? res.status(200).json({status:'success',message:'product deleted succesffuly'}) : res.status(400).json({status:'fail',message:'cannot find product'})
})

module.exports = {createProduct,getProduct,getProducts,updateProduct,deleteProduct}