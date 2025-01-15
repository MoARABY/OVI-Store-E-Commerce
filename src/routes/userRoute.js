const router = require('express').Router();
const {createUser,getUsers,getUser,updateUser,changeUserPassword,deleteUser
    ,getprofile,updateProfile,updateLoggedUserPassword,deActivateLoggedUser,activateLoggedUser} = require('../controllers/userController')
const {createUserValidator,getUserValidator,updateUserValidator,changeUserPasswordValidator,deleteUserValidator} = require('../validators/userValidator')
const {verifyToken,verifyUser,verifyRole} = require('../middlewares/verifyToken')




router.route('/profile').get(verifyToken,getprofile).put(verifyToken,updateProfile).delete(verifyToken,deActivateLoggedUser)    
router.route('/profile/change-password').put(verifyToken,updateLoggedUserPassword)  
router.route('/profile/activate').put(verifyToken,activateLoggedUser)
router.route('/').post(verifyRole('admin'),createUserValidator,createUser).get(getUsers)
router.route('/:id').get(verifyRole('admin','user'),getUserValidator,getUser)
.put(verifyRole('admin'),updateUserValidator,updateUser)
.delete(verifyRole('admin'),deleteUserValidator,deleteUser)
router.route('/change-password/:id').put(verifyUser,changeUserPasswordValidator,changeUserPassword)


module.exports = router