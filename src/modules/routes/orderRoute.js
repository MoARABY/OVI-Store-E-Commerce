const {createOrder, getOrders, getLoggedUserOrders,updateOrderStatus, checkOutSession, webhookCheckout} = require('../controllers/orderController')
const {verifyRole} = require('../../guards/isAuthorized')
const router = require('express').Router()



/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - items
 *         - totalPrice
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product
 *         totalPrice:
 *           type: number
 *           description: The total price of the order
 *         status:
 *           type: string
 *           description: The status of the order (e.g., pending, completed, canceled)
 *       example:
 *         items:
 *           - productId: 64f1b1b1b1b1b1b1b1b1b1b1
 *             quantity: 2
 *         totalPrice: 199.99
 *         status: pending
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management routes
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       403:
 *         description: Forbidden
 */
router.get('/', verifyRole('admin'), getOrders);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order (User only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.post('/', verifyRole('user'), createOrder);

/**
 * @swagger
 * /orders/my-orders:
 *   get:
 *     summary: Get logged-in user's orders (User only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of the user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       403:
 *         description: Forbidden
 */
router.get('/my-orders', verifyRole('user'), getLoggedUserOrders);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update order status (Admin or Manager only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the order
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Order not found
 */
router.put('/:id', verifyRole('admin', 'manager'), updateOrderStatus);

/**
 * @swagger
 * /orders/checkout-session:
 *   get:
 *     summary: Initiate a checkout session (User only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Checkout session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId:
 *                   type: string
 *                   description: The ID of the checkout session
 *       403:
 *         description: Forbidden
 */
router.get('/checkout-session', verifyRole('user'), checkOutSession);

/**
 * @swagger
 * /orders/webhook-session:
 *   post:
 *     summary: Webhook for handling checkout session events
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event:
 *                 type: string
 *                 description: The event type (e.g., payment_succeeded, payment_failed)
 *               data:
 *                 type: object
 *                 description: The event data
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *       400:
 *         description: Invalid webhook payload
 */
router.route('/webhook-session').post(webhookCheckout);



module.exports = router