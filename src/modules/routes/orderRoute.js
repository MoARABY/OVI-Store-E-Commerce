const {createOrder, getOrders, getLoggedUserOrders,updateOrderStatus, checkOutSession, createCardOrder, webhookCheckout} = require('../controllers/orderController')
const {verifyRole} = require('../../guards/isAuthorized')
const router = require('express').Router()



router.get('/',verifyRole('admin'),getOrders)
router.post('/',verifyRole('user'),createBrandValidator,createOrder)
router.get('/my-orders',verifyRole('user'),checkIdValidator,getLoggedUserOrders)
router.put('/:id',verifyRole('admin','manager'),updateBrandValidator,updateOrderStatus)
router.get('/checkout-session',verifyRole('admin','manager'),updateBrandValidator,checkOutSession)



module.exports = router