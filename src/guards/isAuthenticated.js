

const isLoggedUser = (req,res,next)=>{
    if(!req.loggedUser?._id) return res.status(401).json("Access Denied")
}

module.exports = {isLoggedUser}