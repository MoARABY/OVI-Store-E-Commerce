const asyncHandler = require('express-async-handler');
const userModel = require('../../../DB/models/userModel')





const getAddresses = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.loggedUser.userId).populate('addresses')
    user ?  res.status(200).json({length:user.addresses.length,data:user.addresses}) : res.status(400).json("User not found")
})

const addToAddresses = asyncHandler(async (req, res) => {
    const user = await userModel.findByIdAndUpdate(req.loggedUser.userId,{$addToSet:{addresses:req.body}},{new:true})
    user ?  res.status(200).json({msg:'address added successfully',data:user.addresses}) : res.status(400).json("User not found")
})

const removeFromAddresses = asyncHandler(async (req, res) => {
    const user = await userModel.findByIdAndUpdate(req.loggedUser.userId,{$pull:{addresses:{_id:req.params.id}}},{new:true})
    user ?  res.status(200).json({msg:'address removed successfully'}) : res.status(400).json("User not found")
})

module.exports = {getAddresses,addToAddresses,removeFromAddresses}