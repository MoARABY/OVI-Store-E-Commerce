const JWT = require('jsonwebtoken')


const verifyToken = (req,res,next)=>{
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null)
    if(!token) return res.status(401).json("invalid Token")
    
    JWT.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err) return res.status(401).json({message:"Invalid Token"})
        req.loggedUser = user
        next()
    })
}

module.exports = verifyToken