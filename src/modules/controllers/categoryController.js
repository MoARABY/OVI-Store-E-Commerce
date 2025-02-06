const categoryModel = require('../../../DB/models/categoryModel')
const asyncHandler = require('express-async-handler');



const createCategory = asyncHandler(async (req,res)=>{
    const category = await categoryModel.create(req.body)
    category ? res.status(201).json(category) : res.status(400).json({msg: 'Category creation failed'})
})

const getCategory = asyncHandler(async (req,res)=>{
    const {id}  =req.params
    const category = await categoryModel.findById(id)
    category ? res.status(201).json(category) : res.status(400).json({msg:'category not founded'})
})

const getCategories = asyncHandler(async (req,res)=>{
    const category = await categoryModel.find({})
    category ? res.status(201).json(category) : res.status(400).json({msg:'no categories founded'})
})

const updateCategory = asyncHandler(async (req,res)=>{
    const {id}  =req.params
    const category = await categoryModel.findByIdAndUpdate(id,req.body,{new:true})
    category ? res.status(201).json({msg:'category updated successfully',category}) : res.status(400).json({msg:'category not founded'})
})

const deleteCategory = asyncHandler(async (req,res)=>{
    const {id}  =req.params
    const category = await categoryModel.findByIdAndDelete(id,req.body,{new:true})
    category ? res.status(201).json({msg:'category deleted successfully'}) : res.status(400).json({msg:'category not founded'})
})

module.exports = {createCategory,getCategory,getCategories,updateCategory,deleteCategory}