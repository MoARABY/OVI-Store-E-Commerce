const {getLoggedUserCart,addToCart,updateCart,removeFromCart,clearCart,applyCoupon} = require('../controllers/cartController')
const {createCartValidator,removeFromCartValidator,updateBrandValidator} = require('../validators/cartvalidatior')
const {verifyRole} = require('../../guards/isAuthorized')
const router = require('express').Router()


router.route('/').get(verifyRole('user'),getLoggedUserCart)
.post(verifyRole('user'),createCartValidator,addToCart)
.delete(verifyRole('user'),clearCart)
.put(verifyRole('user'),applyCoupon)

router.route('/:itemId').delete(verifyRole('user'),removeFromCartValidator,removeFromCart)
router.route('/:id').put(verifyRole('user'),updateCart)



module.exports = router