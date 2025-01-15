const userModel = require('../models/userModel')
const sendEmails = require('../utils/sendEmails')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')


const signUp = asyncHandler(async (req,res,next)=>{
    const user = await userModel.create(req.body)
    const {password, ...rest} = user._doc
    user ? res.status(201).json(rest) : res.status(400).json('User not created')
})

const login = asyncHandler(async (req,res)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email})
    if(!user || ! await bcrypt.compare(password,user.password)) {
        return res.status(400).json('Invalid email or password'
    )}

    const Token = jwt.sign({userId:user._id,name:user.name,email:user.email,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE_DATE})
            
    if(!Token) return res.status(400).json({message:"Token not generated"})
    const {password:pass, ...others} = user._doc
    return res.cookie('token',Token,{httpOnly:true}).status(200).json({token:Token,...others})
})

const forgotPassword = asyncHandler(async (req,res,next)=>{
    const {email} = req.body
    const user = await userModel.findOne({email})
    if(!user) return res.status(404).json('User Not Found')
    
    // const resetCode = bcrypt.hash(Math.floor(100000 + Math. random() * 900000).toString(),10)
    const resetCode = Math.floor(100000 + Math. random() * 900000).toString()
    const hashedCode = crypto.createHash('sha256').update(resetCode).digest('hex')
    user.passwordResetCode = hashedCode
    user.passwordResetCodeExpires = Date.now() + (10 * 60 *1000)
    user.passwordResetCodeVerified = false
    await user.save()
    const message = `Hi ${user.name},\n\nwe received a request to reset your password.\nYour password reset code is ${resetCode}. \nIf you did not request this, please ignore this email.`
    try {
        await sendEmails({
            email:user.email,
            subject:'Password Reset Token',
            message
        })
    } catch (err) {
        user.passwordResetCode = undefined;
        user.passwordResetCodeExpires = undefined;
        user.passwordResetCodeVerified = undefined;
        await user.save();
        return next(new ApiError(`There is an error in sending email ${err}`, 500));
    }
        res.status(200).json({ status: 'Success', message: 'Reset code sent to email' });

})

const verifyResetCode = asyncHandler(async (req,res,next)=>{
    const {resetCode} = req.body
    const hashedCode = crypto.createHash('sha256').update(resetCode).digest('hex')
    const user = await userModel.findOne({passwordResetCode:hashedCode,passwordResetCodeExpires:{$gt:Date.now()}})  
    if(!user) return res.status(404).json('Code Expired or Invalid')
    user.passwordResetCodeVerified = true
    await user.save()
    res.status(200).json({status:'Success',message:'Code Verified'})
})

const resetPassword = asyncHandler(async (req,res,next)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email})
    if(!user) return res.status(404).json(`There is no user with email ${email}`)
    if(!user.passwordResetCodeVerified) return res.status(400).json('your code is not verified')
    user.password = password
    user.passwordResetCode = undefined
    user.passwordResetCodeExpires = undefined
    user.passwordResetCodeVerified = undefined
    await user.save()
    res.status(200).json({status:'Success',message:'Password Reset Successful',user})
})

module.exports = {signUp,login,forgotPassword,verifyResetCode,resetPassword}