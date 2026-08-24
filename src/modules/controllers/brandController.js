const brandModel = require('../../../DB/models/brandModel')
const asyncHandler = require('express-async-handler')




const createBrand = asyncHandler(async (req,res)=>{
    const brand = await brandModel.create(req.body)
    brand ? res.status(201).json({status:'success',message:'brand created successfully',data:brand}) : res.status(400).json({status:'fail',message:'brand not created'})
})

const getBrand = asyncHandler(async (req,res)=>{
    const {id}  =req.params
    const brand = await brandModel.findById(id)
    brand ? res.status(201).json({status:'success',message:'brand found',data:brand}) : res.status(404).json({status:'fail',message:'brand not found'})
})

const getBrands = asyncHandler(async (req,res)=>{
    const brand = await brandModel.find({})
    brand.length > 0 ? res.status(201).json({status:'success',message:'brands found',length:brand.length,data:brand}) : res.status(404).json({status:'fail',message:'no brands found'})
})

const updateBrand = asyncHandler(async (req,res)=>{
    const {id}  =req.params
    const brand = await brandModel.findByIdAndUpdate(id,req.body,{new:true})
    brand ? res.status(201).json({status:'success',message:'brand updated successfully',data:brand}) : res.status(404).json({status:'fail',message:'brand not found'})
})

const deleteBrand = asyncHandler(async (req,res)=>{
    const {id}  =req.params
    const brand = await brandModel.findByIdAndDelete(id,req.body,{new:true})
    brand ? res.status(201).json({status:'success',message:'brand deleted successfully'}) : res.status(404).json({status:'fail',message:'brand not found'})
})



module.exports = {createBrand,getBrand,getBrands,updateBrand,deleteBrand}