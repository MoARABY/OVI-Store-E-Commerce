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



// logged user

const getprofile = asyncHandler(async (req,res)=>{
    req.params.id = req.loggedUser.userId
    getUser(req,res)
})

const updateProfile = asyncHandler(async (req,res)=>{
    req.params.id = req.loggedUser.userId
    updateUser(req,res)
})

const updateLoggedUserPassword = asyncHandler(async (req,res)=>{
    const {userId} = req.loggedUser
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
    req.params.id = req.loggedUser.userId
    deleteUser(req,res)
})

const activateLoggedUser = asyncHandler(async (req,res)=>{
    const user = await userModel.findById(req.loggedUser.userId)
    if(user) {
        user.isActivated = true
        await user.save()
        res.status(200).json('user Activated successfully')
    } else {
        res.status(404).json({message:'User not found'})    
    }
})


module.exports = {createUser,getUser,getUsers,updateUser,deleteUser,getprofile,updateProfile,updateLoggedUserPassword,deActivateLoggedUser,activateLoggedUser}

