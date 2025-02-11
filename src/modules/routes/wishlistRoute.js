const {getWishlist,addToWishlist,removeFromWishlist} = require('../controllers/wishlistController')
const {verifyRole} = require('../../guards/isAuthorized')

const router = require('express').Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     WishlistItem:
 *       type: object
 *       required:
 *         - productId
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product to add to the wishlist
 *       example:
 *         productId: 64f1b1b1b1b1b1b1b1b1b1b1
 */

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management routes
 */

/**
 * @swagger
 * /wishlist:
 *   post:
 *     summary: Add a product to the wishlist (User only)
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WishlistItem'
 *     responses:
 *       201:
 *         description: Product added to the wishlist successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.post('/', verifyRole('user'), addToWishlist);

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get the user's wishlist (User only)
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of products in the user's wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WishlistItem'
 *       403:
 *         description: Forbidden
 */
router.get('/', verifyRole('user'), getWishlist);

/**
 * @swagger
 * /wishlist/{id}:
 *   delete:
 *     summary: Remove a product from the wishlist (User only)
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to remove from the wishlist
 *     responses:
 *       200:
 *         description: Product removed from the wishlist successfully
 *       400:
 *         description: Invalid ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found in the wishlist
 */
router.delete('/:id', verifyRole('user'), removeFromWishlist);



module.exports = router