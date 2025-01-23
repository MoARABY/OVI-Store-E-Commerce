const userModel = require('../../../DB/models/userModel')
const asyncHandler = require('express-async-handler')



const createUser = asyncHandler(async(req,res)=>{
    const user = await userModel.create(req.body)
    const {password,...others} = user._doc
    user ? res.status(201).json({msg:'user created successfully',others}) : res.status(400).json({msg:'user not created'})
})

const getUser = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const user = await userModel.findById(id)
    const {password,...others} = user._doc
    user ? res.status(201).json({msg:'user',others}) : res.status(400).json({msg:'cannot find user'})
})

const getUsers = asyncHandler(async(req,res)=>{
    const users = await userModel.find({})
    users ? res.status(201).json({msg:'users list',users}) : res.status(400).json({msg:'no users founded'})
})

const updateUser = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const user = await userModel.findByIdAndUpdate(id,req.body,{new:true})
    user ? res.status(201).json({msg:'user updated successfully',user}) : res.status(400).json({msg:'cannot find user'})
})

const deleteUser = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const user = await userModel.findByIdAndDelete(id,req.body,{new:true})
    user ? res.status(201).json({msg:'user deleted successfully'}) : res.status(400).json({msg:'cannot find user'})
})

module.exports = {createUser,getUser,getUsers,updateUser,deleteUser}

