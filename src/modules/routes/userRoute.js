const router = require('express').Router()
const {createUserValidator,getUserValidator,updateUserValidator} = require('../validators/userValidator')
const {createUser,getUser,getUsers,updateUser,deleteUser} = require('../controllers/userController')
const {verifyRole} = require('../../guards/isAuthorized')


router.use(verifyRole('admin'))
router.route('/').get(getUsers).post(createUserValidator,createUser)
router.route('/:id').get(getUserValidator,getUser).put(updateUserValidator,updateUser).delete(getUserValidator,deleteUser)

module.exports = router
