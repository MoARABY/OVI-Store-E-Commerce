const verifyToken = require('../middlewares/verifyToken')


const verifyRole = (...roles)=>{
    return (req,res,next)=>{
        verifyToken(req,res,()=>{
            if(!roles.includes(req.loggedUser.role)) return res.status(401).json({status:'fail',message:'You are not authorized to perform this action'})
            next()   
        })
    }
}

module.exports = {verifyRole}