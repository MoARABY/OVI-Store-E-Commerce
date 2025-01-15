const {addToCart,getLoggedUserCart,removeItemFromCart,clearCart,applyCoupon} = require('../controllers/cartController')
// const {createCartValidator,getCartValidator,updateCartValidator,deleteCartValidator} = require('../validators/cartValidator')   
const {verifyRole} = require('../middlewares/verifyToken')

const router = require('express').Router()

router.route('/').post(verifyRole('user'),addToCart)
.get(verifyRole('user'),getLoggedUserCart)
.delete(verifyRole('user'),clearCart)
.put(verifyRole('user'),applyCoupon)

router.route('/:itemId').delete(verifyRole('user'),removeItemFromCart)


module.exports = router