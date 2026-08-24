

const isLoggedUser = (req,res,next)=>{
    if(!req.loggedUser?._id) return res.status(401).json({status:'fail',message:'You are not logged in'})
    next()
}

module.exports = {isLoggedUser}