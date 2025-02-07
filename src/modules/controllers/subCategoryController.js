const subCategoryModel = require('../../../DB/models/subCategoryModel')
const asyncHandler = require('express-async-handler')
const ApiFeatures = require('../../utils/apiFeatures')




const createSubCategory = asyncHandler(async (req,res)=>{
    const subCategory = await subCategoryModel.create(req.body)
    subCategory ? res.status(201).json({msg:'subCategory created successfully',subCategory}) : res.status(400).json({msg:'subCategory not created'})
})

const getSubCategory = asyncHandler(async (req,res)=>{
    const {id}  =req.params
    const subCategory = await subCategoryModel.findById(id)
    subCategory ? res.status(201).json(subCategory) : res.status(400).json({msg:'subCategory not founded'})
})

const getSubCategories = asyncHandler(async (req,res)=>{
    let filterObj = {}
    if (req.params.categoryId) filterObj = {category:req.params.categoryId}


    const countDocuments = await subCategoryModel.countDocuments()
    const apiFeatures = new ApiFeatures(req.query,subCategoryModel.find(filterObj))
    .filter()
    .limitFields()
    .sort()
    .paginate(countDocuments)
    .search('subCategoryModel')

    const {mongooseQuery,paginateFeatures } = apiFeatures

    const subCategories = await mongooseQuery
    subCategories ? res.status(201).json({length:subCategories.length,paginateFeatures,Data:subCategories}) : res.status(400).json({msg:'no subCategory founded'})
})

const updateSubCategory = asyncHandler(async (req,res)=>{
    const {id}  = req.params
    const subCategory = await subCategoryModel.findByIdAndUpdate(id,req.body,{new:true})
    subCategory ? res.status(201).json({msg:'subCategory updated successfully',subCategory}) : res.status(400).json({msg:'subCategory not founded'})
})

const deleteSubCategory = asyncHandler(async (req,res)=>{
    const {id}  =req.params
    const subCategory = await subCategoryModel.findByIdAndDelete(id,req.body,{new:true})
    subCategory ? res.status(201).json({msg:'subCategory deleted successfully'}) : res.status(400).json({msg:'subCategory not founded'})
})


module.exports = {createSubCategory,getSubCategory,getSubCategories,updateSubCategory,deleteSubCategory}