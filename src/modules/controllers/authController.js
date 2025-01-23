const userModel = require('../../../DB/models/userModel')
const asyncHandler = require('express-async-handler')
const sendSMS = require('../../utils/sendOTP')
const sendEmails = require('../../utils/sendEmails')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()



const signUp = asyncHandler(async(req,res)=>{
    const user = await userModel.create(req.body)
    const {password,...others} = user._doc
    user ? res.status(201).json({msg:'user created successfully',others}) : res.status(400).json({msg:'user not created'})
})

const sendOTP = asyncHandler(async(req,res)=>{
    const {phone} = req.body
    const user = await userModel.findOne({phone})
    if(!user) return res.status(400).json('invalid phone number')

    const verifyCode = Math.floor(100000 + Math. random() * 900000).toString()
    const hashedVerifyCode = crypto.createHash('sha256').update(verifyCode).digest('hex')
    user.phoneVerifyCode = hashedVerifyCode
    user.phoneVerifyCodeExpires = Date.now() + (10 * 60 *1000)
    user.phoneVerifyCodeVerified = false
    await user.save()

    try {
        sendSMS(phone, `Your verification code is: ${verifyCode}`)
    } catch (err) {
        user.phoneVerifyCode = undefined;
        user.phoneVerifyCodeExpires = undefined;
        user.phoneVerifyCodeVerified = undefined;
        await user.save();
        return res.status(400).json({ status: 'fail', message: 'SMS did not sent' })
    }
    res.status(200).json({ status: 'Success', message: 'SMS send successfully' });
})

const verifyOTP = asyncHandler(async(req,res)=>{
    const {verifyCode} = req.body
    const hashedCode = crypto.createHash('sha256').update(verifyCode).digest('hex')
    const user = await userModel.findOne({phoneVerifyCode:hashedCode,phoneVerifyCodeExpires:{$gt:Date.now()}})
    if(!user) return res.status(404).json('Code Expired or Invalid')

        user.phoneVerifyCodeVerified = true
        await user.save()
        res.status(200).json({status:'Success',message:'phone number Verified'})
})

const logIn = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password) return res.status(400).json('all fields are required')
    const user = await userModel.findOne({email})
    if(!user || ! await bcrypt.compare(password,user.password)) {
        return res.status(400).json('Invalid email or password')
    }
    const token = jwt.sign({userId:user._id,name:user.name,email:user.email,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE_DATE})
    if(!token) return res.status(400).json({message:"Token not generated"})
        const {password:Pass, ...others} = user._doc
        return res.cookie('token',token,{httpOnly:true}).status(200).json({token:token,...others})
})

const forgotPassword = asyncHandler(async(req,res)=>{
    const {email} = req.body
    const user = await userModel.findOne({email})
    if(!user) return res.status(400).json('Invalid email')
        const resetCode = Math.floor(100000 + Math. random() * 900000).toString()
        const hashedCode = crypto.createHash('sha256').update(resetCode).digest('hex')
        user.passwordResetCode = hashedCode
        user.passwordResetCodeExpires = Date.now() + (10 * 60 *1000)
        user.passwordResetCodeVerified = false
        await user.save()

    try {
        const message = `Hi ${user.name},\n\nwe received a request to reset your password.\nYour password reset code is ${resetCode}. \nIf you did not request this, please ignore this email.`
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

        return res.status(400).json({ status: 'fail', message: 'Reset code not sent !!!' ,error:err})
    }
        res.status(200).json({ status: 'Success', message: 'Reset code sent to email' })

})

const verifyResetCode  = asyncHandler(async(req,res)=>{
    const {resetCode} = req.body
    const hashedCode = crypto.createHash('sha256').update(resetCode).digest('hex')
    const user = await userModel.findOne({passwordResetCode:hashedCode,passwordResetCodeExpires:{$gt:Date.now()}})  


    if(!user) return res.status(404).json('Code Expired or Invalid')
    user.passwordResetCodeVerified = true
    await user.save()
    res.status(200).json({status:'Success',message:'Code Verified'})
})

const resetPassword = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email})
    if(!user) return res.status(404).json(`There is no user with email ${email}`)
    if(!user.passwordResetCodeVerified) return res.status(400).json('your code is not verified')
    user.password = password
    user.passwordResetCode = undefined
    user.passwordResetCodeExpires = undefined
    user.passwordResetCodeVerified = undefined
    await user.save()
    const {password:pass,...others} = user._doc
    res.status(200).json({status:'Success',message:'Password Reset Successful',others})
})


module.exports = {signUp,sendOTP,verifyOTP,logIn,forgotPassword,resetPassword,verifyResetCode}
