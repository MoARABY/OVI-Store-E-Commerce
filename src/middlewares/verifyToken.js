const JWT = require('jsonwebtoken')
const userModel = require('../../DB/models/userModel')

const verifyToken = (req,res,next)=>{
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null)
    if(!token) return res.status(401).json({status:'fail',message:'You are not logged in, please log in to get access'})
    
    JWT.verify(token,process.env.JWT_SECRET_KEY,async (err,user)=>{
        if(err) return res.status(401).json({status:'fail',message:"Invalid Token"})
        const exiestUser = await userModel.findById(user.userId)
        if(!exiestUser) return res.status(401).json({status:'fail',message:"The user belonging to this token does no longer exist"})
        if(exiestUser.passwordChangedAt && exiestUser.passwordChangedAt.getTime() > user.iat * 1000) return res.status(401).json({status:'fail',message:"User recently changed password! Please log in again."})
        if(!exiestUser.isActive) return res.status(401).json({status:'fail',message:"User is deactivated! Please contact support."})
        const userData = {
            userId: exiestUser._id,
            email: exiestUser.email,
            name: exiestUser.name,
            phone: exiestUser.phone,
            role: exiestUser.role
        }
        req.loggedUser = userData
        next()
    })
}

module.exports = verifyToken