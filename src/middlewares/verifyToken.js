const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const asyncHandler = require('express-async-handler')


const verifyToken = asyncHandler(async (req,res,next)=>{
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null)
    // const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null
    if(!token) return res.status(401).json({message:"Access Denied 1"})
    try {
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
            if(err) return res.status(400).json({message:"Invalid Token"})
            return req.user = user
        })
        const user = await userModel.findById(req.user.userId)
        if(!user) return res.status(401).json({message:"User not found"})
        // if(!user.isActivated) return res.status(401).json({message:"User is not activated"})
        if(user.passwordChangedAt){
            const changedPasswordTime = parseInt(user.passwordChangedAt.getTime() / 1000,10)
            if(changedPasswordTime > req.user.iat) return res.status(401).json({message:"Password Changed"})
        }
        next()
    } catch (error) {
        res.status(400).json({message:"Invalid Token"})
    }
})

const verifyAdmin = asyncHandler(async (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.role !== 'admin') return res.status(401).json({message:"Access Denied you are not an admin"})
        next()
    })
})

const verifyUser = asyncHandler(async (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.params.id !== req.user.userId) return res.status(401).json({message:"Access Denied you are not the user"})
        next()
    })
})

const verifyRole = (...roles)=>{
    return (req,res,next)=>{
        verifyToken(req,res,()=>{
            if(!roles.includes(req.user.role)) return res.status(401).json({message:"Access Denied you are not authorized !"})
            next()
        })
    }
}
module.exports = {verifyToken,verifyAdmin,verifyUser,verifyRole}