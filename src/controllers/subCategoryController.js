const subCategoryModel = require('../models/subCategoryModel')
const categoryModel = require('../models/categoryModel')
const asyncHandler = require('express-async-handler')


const createSubCategory = asyncHandler(async(req,res)=>{
    if(!req.body.category) {
        return res.status(400).json('sub Category must belong to category')
    }
    const category = await categoryModel.findById(req.body.category)
    if(!category) {
        return res.status(400).json('Invalid Category')
    }
    const subCategory = await subCategoryModel.create(req.body)
    subCategory ? res.status(201).json({subCategory}) :  res.status(400).json('Cannot Create subCategory')
})

const getSubCategories = asyncHandler(async(req,res)=>{
    let filterObj = {}
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const skip = (page-1)*limit
    if(req.params.categoryId) filterObj = {category:req.params.categoryId}
    const subCategories = await subCategoryModel.find(filterObj).skip(skip).limit(limit)
    subCategories ? res.status(200).json({length:subCategories.length,page,limit,data:subCategories}) :  res.status(400).json('Cannot find subCategories')  
})

const getSubCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const subCategory = await subCategoryModel.findById(id)
    subCategory ? res.status(200).json(subCategory) :  res.status(400).json('Cannot find subCategory')
})

const updateSubCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const subCategory = await subCategoryModel.findByIdAndUpdate(id,req.body,{new:true})
    subCategory ? res.status(200).json(subCategory) :  res.status(400).json('Cannot update subCategory')
})

const deleteSubCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const subCategory = await subCategoryModel.findByIdAndDelete(id,{new:true})
    subCategory ? res.status(200).json(subCategory) :  res.status(400).json('Cannot delete subCategory')
})

module.exports = {createSubCategory,getSubCategories,getSubCategory,updateSubCategory,deleteSubCategory}