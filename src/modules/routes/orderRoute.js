const {createOrder, getOrders, getLoggedUserOrders,updateOrderStatus, checkOutSession, createCardOrder, webhookCheckout} = require('../controllers/orderController')
const {verifyRole} = require('../../guards/isAuthorized')
const router = require('express').Router()



router.get('/',verifyRole('admin'),getOrders)
router.post('/',verifyRole('user'),createOrder)
router.get('/my-orders',verifyRole('user'),getLoggedUserOrders)
router.put('/:id',verifyRole('admin','manager'),updateOrderStatus)
router.get('/checkout-session',verifyRole('user'),checkOutSession)
router.route('/create-card-order').post(verifyRole('user'), createCardOrder)
router.route('/webhook-session').post(webhookCheckout)



module.exports = router