const categoryModel = require('../../../DB/models/categoryModel')
const asyncHandler = require('express-async-handler');
const ApiFeatures = require('../../utils/apiFeatures')


const createCategory = asyncHandler(async (req,res)=>{
    const category = await categoryModel.create(req.body)
    category ? res.status(201).json({status:'success',message:'category created successfully',data:category}) : res.status(400).json({status:'fail',message:'category not created'})
}) 

const getCategory = asyncHandler(async (req,res)=>{
    const {id}  =req.params
    const category = await categoryModel.findById(id)
    category ? res.status(201).json({status:'success',message:'category found',data:category}) : res.status(404).json({status:'fail',message:'category not found'})
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
    categories.length > 0 ? res.status(201).json({status:'success',message:'categories found',length:categories.length,paginateFeatures,data:categories}) : res.status(404).json({status:'fail',message:'no categories found'})
})

const updateCategory = asyncHandler(async (req,res)=>{
    const {id}  =req.params
    const category = await categoryModel.findByIdAndUpdate(id,req.body,{new:true})
    category ? res.status(201).json({status:'success',message:'category updated successfully',data:category}) : res.status(404).json({status:'fail',message:'category not found'})
})

const deleteCategory = asyncHandler(async (req,res)=>{
    const {id}  =req.params
    const category = await categoryModel.findByIdAndDelete(id,req.body,{new:true})
    category ? res.status(201).json({status:'success',message:'category deleted successfully'}) : res.status(404).json({status:'fail',message:'category not found'})
})

module.exports = {createCategory,getCategory,getCategories,updateCategory,deleteCategory}