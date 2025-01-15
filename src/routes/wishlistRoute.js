const {getWishlist,addToWishlist,removeFromWishlist} = require('../controllers/wishlistController')
const {verifyRole} = require('../middlewares/verifyToken')
const router = require('express').Router()


router.route('/').get(verifyRole('user'),getWishlist).post(verifyRole('user'),addToWishlist)
router.route('/:id').delete(verifyRole('user'),removeFromWishlist)


module.exports = router