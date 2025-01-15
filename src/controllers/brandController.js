const brandModel=require('../models/brandModel')
const asyncHandler=require('express-async-handler')




const createBrand = asyncHandler(async (req,res) =>{
    const brand = await brandModel.create(req.body)
    brand ? res.status(201).json(brand) : res.status(400).json({message: 'Brand creation failed'})
})

const getBrands = asyncHandler(async(req,res)=>{
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const skip = (page - 1) * limit
    const brands = await brandModel.find({}).limit(limit).skip(skip)
    brands ? res.status(201).json({length: brands.length,page,limit, data:brands}) : res.status(400).json({message: 'No Brand found'})
})

const getBrand = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const brand = await brandModel.findById(id)
    brand ? res.status(201).json(brand) : res.status(400).json({message: 'Brand not found'})
})

const updateBrand = asyncHandler(async(req,res)=>{
    const {id} = req.params
    
    console.log(req.body)
    const brand = await brandModel.findByIdAndUpdate(id, req.body, {new: true});
    brand ? res.status(201).json(brand) : res.status(400).json({message: 'Brand not found'})
})

const deleteBrand = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const brand = await brandModel.findByIdAndDelete(id)
    brand ? res.status(201).json("Brand deleted Successfully") : res.status(400).json({message: 'Brand not found'})
})


module.exports={createBrand,getBrands,getBrand,updateBrand,deleteBrand}