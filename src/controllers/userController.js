const userModel = require('../models/userModel')
const ApiFeature = require('../utils/apiFeatures')
const asyncHandler = require('express-async-handler')
const JWT = require('jsonwebtoken')




// admin
const createUser = asyncHandler(async (req,res)=>{
    const user = await userModel.create(req.body)
    const {password,isActivated,wishlist,...rest} = user._doc
    user ? res.status(201).json(rest) : res.status(400).json({message:'User not created'})
})

const getUsers = asyncHandler(async (req,res)=>{

    const countDocuments = await userModel.countDocuments()
    const apiFeatures = new ApiFeature(req.query,userModel.find())
    .filter()
    .limitFields()
    .sort()
    .paginate(countDocuments)
    .search('userModel')

    const { mongooseQuery, paginateFeatures } = apiFeatures;

// execute query
    const users = await mongooseQuery
    users ? res.status(200).json({length:users.length,paginateFeatures,Data:users}): res.status(404).json({message:'Users not found'})
})

const getUser = asyncHandler(async (req,res)=>{
    const {id} = req.params
    const user = await userModel.findById(id)
    user ? res.status(200).json(user) : res.status(404).json({message:'User not found'})
})

const updateUser = asyncHandler(async (req,res)=>{
    const {id} = req.params
    const {password,...rest} = req.body
    const user = await userModel.findByIdAndUpdate(id,rest,{new:true})
    user ? res.status(200).json(user) : res.status(404).json({message:'User not found'})
})

const changeUserPassword = asyncHandler(async (req,res)=>{
    const {id} = req.params
    const {password} = req.body
    const user = await userModel.findById(id)
    if(user) {
        user.password = password
        user.passwordChangedAt = Date.now()
        await user.save()
        res.status(200).json({msg:'Password changed successfully',user})
    } else {
        res.status(404).json({message:'User not found'})    
    }
})

const deleteUser = asyncHandler(async (req,res)=>{
    const {id} = req.params
    const user = await userModel.findById(id)
    if(user) {
        user.isActivated = false
        await user.save()
        res.status(200).json('user deActivated successfully')
    } else {
        res.status(404).json({message:'User not found'})    
    }
})



// logged user
const getprofile = asyncHandler(async (req,res)=>{
    req.params.id = req.user.userId
    getUser(req,res)
})

const updateProfile = asyncHandler(async (req,res)=>{
    req.params.id = req.user.userId
    updateUser(req,res)
})

const updateLoggedUserPassword = asyncHandler(async (req,res)=>{
    const {userId} = req.user
    const {password} = req.body
    const user = await userModel.findById(userId)
    if(user) {
        user.password = password
        user.passwordChangedAt = Date.now()
        await user.save()

    JWT.sign({userId:user._id,email:user.email,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE_DATE},(err,token)=>{
        res.status(200).json({msg:'Password changed successfully',user,token})
    })
    } else {
        res.status(404).json({message:'User not found'})    
    }
})

const deActivateLoggedUser = asyncHandler(async (req,res)=>{
    req.params.id = req.user.userId
    deleteUser(req,res)
})

const activateLoggedUser = asyncHandler(async (req,res)=>{
    const user = await userModel.findById(req.user.userId)
    if(user) {
        user.isActivated = true
        await user.save()
        res.status(200).json('user Activated successfully')
    } else {
        res.status(404).json({message:'User not found'})    
    }
})

module.exports = {createUser,getUsers,getUser,updateUser,changeUserPassword,
    deleteUser,getprofile,updateProfile,updateLoggedUserPassword,deActivateLoggedUser,activateLoggedUser}