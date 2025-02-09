

const isLoggedUser = (req,res,next)=>{
    if(!req.loggedUser?._id) return res.status(401).json("Access Denied")
    next()
}

module.exports = {isLoggedUser}