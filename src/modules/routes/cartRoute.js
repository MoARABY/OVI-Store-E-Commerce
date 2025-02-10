const {getLoggedUserCart,addToCart,removeFromCart,clearCart} = require('../controllers/cartController')
const {createCartValidator,checkIdValidator,updateBrandValidator} = require('../validators/cartvalidatior')
const {verifyRole} = require('../../guards/isAuthorized')
const router = require('express').Router()


router.route('/').get(verifyRole('user'),getLoggedUserCart)
.post(verifyRole('user'),createCartValidator,addToCart)
.delete(verifyRole('user'),clearCart)
router.route('/:id').delete(verifyRole('user'),removeFromCart)


module.exports = router