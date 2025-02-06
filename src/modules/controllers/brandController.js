const brandModel = require('../../../DB/models/brandModel')
const asyncHandler = require('express-async-handler')




const createBrand = asyncHandler(async (req,res)=>{
    const brand = await brandModel.create(req.body)
    brand ? res.status(201).json({msg:'brand created successfully',brand}) : res.status(400).json({msg:'brand not created'})
})

const getBrand = asyncHandler(async (req,res)=>{
    const {id}  =req.params
    const brand = await brandModel.findById(id)
    brand ? res.status(201).json(brand) : res.status(400).json({msg:'brand not founded'})
})

const getBrands = asyncHandler(async (req,res)=>{
    const brand = await brandModel.find({})
    brand ? res.status(201).json(brand) : res.status(400).json({msg:'no brands founded'})
})

const updateBrand = asyncHandler(async (req,res)=>{
    const {id}  =req.params
    const brand = await brandModel.findByIdAndUpdate(id,req.body,{new:true})
    brand ? res.status(201).json({msg:'brand updated successfully',brand}) : res.status(400).json({msg:'brand not founded'})
})

const deleteBrand = asyncHandler(async (req,res)=>{
    const {id}  =req.params
    const brand = await brandModel.findByIdAndDelete(id,req.body,{new:true})
    brand ? res.status(201).json({msg:'brand deleted successfully'}) : res.status(400).json({msg:'brand not founded'})
})



module.exports = {createBrand,getBrand,getBrands,updateBrand,deleteBrand}