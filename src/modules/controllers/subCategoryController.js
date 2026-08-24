const subCategoryModel = require('../../../DB/models/subCategoryModel')
const asyncHandler = require('express-async-handler')
const ApiFeatures = require('../../utils/apiFeatures')




const createSubCategory = asyncHandler(async (req,res)=>{
    const subCategory = await subCategoryModel.create(req.body)
    subCategory ? res.status(201).json({status:'success',message:'subCategory created successfully',data:subCategory}) : res.status(400).json({status:'fail',message:'subCategory not created'})
})

const getSubCategory = asyncHandler(async (req,res)=>{
    const {id}  =req.params
    const subCategory = await subCategoryModel.findById(id)
    subCategory ? res.status(201).json({status:'success',message:'subCategory found',data:subCategory}) : res.status(404).json({status:'fail',message:'subCategory not found'})
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
    subCategories.length > 0 ? res.status(201).json({status:'success',message:'subCategories found',length:subCategories.length,paginateFeatures,data:subCategories}) : res.status(404).json({status:'fail',message:'no subCategories found'})
})

const updateSubCategory = asyncHandler(async (req,res)=>{
    const {id}  = req.params
    const subCategory = await subCategoryModel.findByIdAndUpdate(id,req.body,{new:true})
    subCategory ? res.status(201).json({status:'success',message:'subCategory updated successfully',data:subCategory}) : res.status(404).json({status:'fail',message:'subCategory not found'})
})

const deleteSubCategory = asyncHandler(async (req,res)=>{
    const {id}  =req.params
    const subCategory = await subCategoryModel.findByIdAndDelete(id,req.body,{new:true})
    subCategory ? res.status(201).json({status:'success',message:'subCategory deleted successfully'}) : res.status(404).json({status:'fail',message:'subCategory not found'})
})


module.exports = {createSubCategory,getSubCategory,getSubCategories,updateSubCategory,deleteSubCategory}