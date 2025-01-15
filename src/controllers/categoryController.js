const categoryModel=require('../models/categoryModel')
const asyncHandler=require('express-async-handler')
const slugify = require('slugify')



const createCategory = asyncHandler(async (req,res) =>{
    const {name} = req.body
    if(!name) {
        return res.status(400).json({ message: 'Please enter category name' });
    }
    req.body.slug=slugify(name)
    const category = await categoryModel.create(req.body)
    category ? res.status(201).json(category) : res.status(400).json({message: 'Category creation failed'})
})

const getCategories = asyncHandler(async(req,res)=>{
    const  page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const skip = (page - 1) * limit
    const categories = await categoryModel.find({}).limit(limit).skip(skip)
    categories ? res.status(201).json({length:categories.length,page,limit,data:categories}) : res.status(400).json({message: 'Categories not found'})
})

const getCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const category = await categoryModel.findById(id)
    category ? res.status(201).json(category) : res.status(400).json({message: 'Category not found'})
})

const updateCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const {name} = req.body
    if(name) {
        req.body.slug=slugify(name)
    }
    const category = await categoryModel.findByIdAndUpdate(id,req.body,{new:true})
    category ? res.status(201).json(category) : res.status(400).json({message: 'Category not found'})
})

const deleteCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const category = await categoryModel.findByIdAndDelete(id)
    category ? res.status(201).json("category deleted Successfully") : res.status(400).json({message: 'Category not found'})
})


module.exports={createCategory,getCategories,getCategory,updateCategory,deleteCategory}