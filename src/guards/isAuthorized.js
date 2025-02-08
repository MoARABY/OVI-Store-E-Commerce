const verifyToken = require('../middlewares/verifyToken')


const verifyRole = (...roles)=>{
    return (req,res,next)=>{
        verifyToken(req,res,()=>{
            if(!roles.includes(req.loggedUser.role)) return res.status(401).json("Access Denied you are not authorized !") 
            next()   
        })
    }
}

module.exports = {verifyRole}