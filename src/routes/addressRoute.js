const {getAddresses,addToAddresses,removeFromAddresses} = require('../controllers/addressController')
const {verifyRole} = require('../middlewares/verifyToken')
const router = require('express').Router()


router.route('/').get(verifyRole('user'),getAddresses).post(verifyRole('user'),addToAddresses)
router.route('/:id').delete(verifyRole('user'),removeFromAddresses)


module.exports = router