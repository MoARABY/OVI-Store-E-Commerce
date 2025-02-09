const {getWishlist,addToWishlist,removeFromWishlist} = require('../controllers/wishlistController')
const {verifyRole} = require('../../guards/isAuthorized')

const router = require('express').Router()


router.post('/',verifyRole('user'),addToWishlist)
router.get('/',verifyRole('user'),getWishlist)
router.delete('/:id',verifyRole('user'),removeFromWishlist)



module.exports = router