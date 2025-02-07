const categoryModel = require('../../../DB/models/categoryModel')
const asyncHandler = require('express-async-handler');
const ApiFeatures = require('../../utils/apiFeatures')


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

    const countDocuments = await categoryModel.countDocuments()
    const apiFeatures = new ApiFeatures(req.query,categoryModel.find())
    .filter()
    .limitFields()
    .sort()
    .paginate(countDocuments)
    .search('categoryModel')

    const {mongooseQuery,paginateFeatures } = apiFeatures

    const categories = await mongooseQuery
    categories ? res.status(201).json({length:categories.length,paginateFeatures,Data:categories}) : res.status(400).json({msg:'no categories founded'})
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