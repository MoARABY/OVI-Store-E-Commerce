const {createOrder, getOrders, getLoggedUserOrders,updateOrderStatus,checkOutSession, createCardOrder,webhookCheckout}   = require('../controllers/orderController');
const {verifyRole} = require('../middlewares/verifyToken');

const router = require('express').Router()


// router.route('/').post(verifyRole('admin'), createOrder).get(verifyRole('admin'), getOrders)
router.route('/').post(verifyRole('user'), createOrder).get(verifyRole('admin'), getOrders)
router.route('/:id').put(verifyRole('admin'), updateOrderStatus)
router.route('/my-orders').get(verifyRole('user'), getLoggedUserOrders)
router.route('/checkout-session').get(verifyRole('user'), checkOutSession)
router.route('/create-card-order').post(verifyRole('user'), createCardOrder)
router.route('/webhook-session').post(webhookCheckout)
// router.route('/:id/pay').put(verifyRole('admin'), updateOrderToPaid)
// router.route('/:id/deliver').put(verifyRole('admin'), updateOrderToDelivered)

module.exports = router
