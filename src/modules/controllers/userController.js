const userModel = require('../../../DB/models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')



const createUser = asyncHandler(async(req,res)=>{
    const user = await userModel.create(req.body)
    const {password,...others} = user._doc
    user ? res.status(201).json({status:'success',message:'user created successfully',data:others}) : res.status(400).json({status:'fail',message:'cannot create user'})
}) 

const getUser = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const user = await userModel.findById(id)
    const {password,...others} = user._doc
    user ? res.status(201).json({status:'success',message:'user found',data:others}) : res.status(400).json({status:'fail',message:'cannot find user'})
})

const getUsers = asyncHandler(async(req,res)=>{
    const users = await userModel.find({ _id : { $ne : req.loggedUser.userId } })
    users.length > 0 ? res.status(201).json({status:'success',message:'users found',data:users}) : res.status(400).json({status:'fail',message:'cannot find users'})
})

const updateUser = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const {name, email, phone} = req.body
    const user = await userModel.findByIdAndUpdate(id,{name, email, phone},{returnDocument:'after'})
    user ? res.status(201).json({status:'success',message:'user updated successfully',data:user}) : res.status(400).json({status:'fail',message:'cannot find user'})
})

const deleteUser = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const user = await userModel.findByIdAndDelete(id,req.body,{new:true})
    user ? res.status(201).json({status:'success',message:'user deleted successfully'}) : res.status(400).json({status:'fail',message:'cannot find user'})
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
    const {currentPassword,newPassword, confirmNewPassword} = req.body
    if(!currentPassword || !newPassword || !confirmNewPassword) return res.status(400).json({status:'fail',message:'please provide all required fields'}    )
    
    const user = await userModel.findById(userId)
    if(user) {
        console.log(user.password)
        console.log(bcrypt.hashSync(currentPassword,12))
        console.log(bcrypt.compareSync(currentPassword,user.password))
        if(! await bcrypt.compare(currentPassword,user.password)) return res.status(400).json({status:'fail',message:'current password is incorrect'})
        if(newPassword !== confirmNewPassword) return res.status(400).json({status:'fail',message:'new password and confirm new password do not match'})
        if(currentPassword === newPassword) return res.status(400).json({status:'fail',message:'new password cannot be the same as current password'})

        JWT.sign({userId:user._id,email:user.email,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE_DATE}, async (err,token)=>{
            user.password = newPassword
            user.passwordChangedAt = Date.now()
            await user.save()
            res.cookie('token',token,{httpOnly:true}).status(200).json({status:'success',message:'Password changed successfully',data:{user:req.loggedUser,token}})
        })
    } else {
        res.status(404).json({status:'fail',message:'User not found'})    
    }
})

const deActivateLoggedUser = asyncHandler(async (req,res)=>{
    const user = await userModel.findById(req.loggedUser.userId)
    if(user) {
        user.isActive = false
        await user.save()
        res.status(200).json({status:'success',message:'user deactivated successfully'})
    } else {
        res.status(404).json({status:'fail',message:'User not found'})    
    }
})

const activateLoggedUser = asyncHandler(async (req,res)=>{
    const user = await userModel.findById(req.loggedUser.userId)
    if(user) {
        user.isActive = true
        await user.save()
        res.status(200).json({status:'success',message:'user Activated successfully'})
    } else {
        res.status(404).json({status:'fail',message:'User not found'})    
    }
})


module.exports = {createUser,getUser,getUsers,updateUser,deleteUser,getprofile,updateProfile,updateLoggedUserPassword,deActivateLoggedUser,activateLoggedUser}

