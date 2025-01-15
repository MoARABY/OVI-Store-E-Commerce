const ProductModel=require('../models/productModel')
const categoryModel = require('../models/categoryModel')
const asyncHandler=require('express-async-handler')
const ApiFeature = require('../utils/apiFeatures')



const createProduct = asyncHandler(async (req,res) =>{
    const Product = await ProductModel.create(req.body)
    Product ? res.status(201).json(Product) : res.status(400).json({message: 'Product creation failed'})
})

const getProducts = asyncHandler(async(req,res)=>{

        const countDocuments = await ProductModel.countDocuments()
        const apiFeatures = new ApiFeature(req.query,ProductModel.find())
        .filter()
        .limitFields()
        .sort()
        .paginate(countDocuments)
        .search('ProductModel')

        const { mongooseQuery, paginateFeatures } = apiFeatures;

    // execute query
    const Products = await mongooseQuery
    Products ? res.status(200).json({length:Products.length,paginateFeatures,Data:Products}) : res.status(400).json({message: 'Categories not found'})
})

const getProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const Product = await ProductModel.findById(id)
    Product ? res.status(201).json(Product) : res.status(400).json({message: 'Product not found'})
})

const updateProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const Product = await ProductModel.findByIdAndUpdate(id,req.body,{new:true})
    Product ? res.status(201).json(Product) : res.status(400).json({message: 'Product not found'})
})

const deleteProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const Product = await ProductModel.findByIdAndDelete(id)
    Product ? res.status(201).json("Product deleted Successfully") : res.status(400).json({message: 'Product not found'})
})


module.exports={createProduct,getProducts,getProduct,updateProduct,deleteProduct}