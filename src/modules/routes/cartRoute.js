const {getLoggedUserCart,addToCart,updateCart,removeFromCart,clearCart,applyCoupon} = require('../controllers/cartController')
const {createCartValidator,removeFromCartValidator,updateBrandValidator} = require('../validators/cartvalidatior')
const {verifyRole} = require('../../guards/isAuthorized')
const router = require('express').Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the cart
 *       example:
 *         productId: 64f1b1b1b1b1b1b1b1b1b1b1
 *         quantity: 2
 *
 *     Coupon:
 *       type: object
 *       required:
 *         - code
 *       properties:
 *         code:
 *           type: string
 *           description: The coupon code
 *       example:
 *         code: SUMMER2023
 */

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: User cart management routes
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the logged-in user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user's cart details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cartItems:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartItem'
 *                 totalPrice:
 *                   type: number
 *                   description: The total price of the cart
 *       403:
 *         description: Forbidden
 */
router.route('/').get(verifyRole('user'), getLoggedUserCart);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       201:
 *         description: Item added to the cart successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.route('/').post(verifyRole('user'), createCartValidator, addToCart);

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Clear the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       403:
 *         description: Forbidden
 */
router.route('/').delete(verifyRole('user'), clearCart);

/**
 * @swagger
 * /cart:
 *   put:
 *     summary: Apply a coupon to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coupon'
 *     responses:
 *       200:
 *         description: Coupon applied successfully
 *       400:
 *         description: Invalid coupon code
 *       403:
 *         description: Forbidden
 */
router.route('/').put(verifyRole('user'), applyCoupon);

/**
 * @swagger
 * /cart/{itemId}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the item to remove
 *     responses:
 *       200:
 *         description: Item removed from the cart successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Item not found in the cart
 */
router.route('/:itemId').delete(verifyRole('user'), removeFromCartValidator, removeFromCart);

/**
 * @swagger
 * /cart/{itemId}:
 *   put:
 *     summary: Update an item in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: Item updated in the cart successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Item not found in the cart
 */
router.route('/:itemId').put(verifyRole('user'), updateCart);



module.exports = router