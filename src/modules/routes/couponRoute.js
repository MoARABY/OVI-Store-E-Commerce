const {createCoupon,getCoupon,getCoupons,updateCoupon,deleteCoupon} = require('../controllers/couponController')
const {createCouponValidator,checkIdValidator} = require('../../modules/validators/couponValidator')
const {verifyRole} = require('../../guards/isAuthorized')
const router = require('express').Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     Coupon:
 *       type: object
 *       required:
 *         - code
 *         - discount
 *         - expiresAt
 *       properties:
 *         code:
 *           type: string
 *           description: The coupon code
 *         discount:
 *           type: number
 *           description: The discount percentage or amount
 *         expiresAt:
 *           type: string
 *           format: date-time
 *           description: The expiration date of the coupon
 *       example:
 *         code: SUMMER2023
 *         discount: 15
 *         expiresAt: 2023-12-31T23:59:59Z
 */

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: Coupon management routes
 */

/**
 * @swagger
 * /coupons:
 *   get:
 *     summary: Get all coupons
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of coupons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coupon'
 *       403:
 *         description: Forbidden
 */
router.route('/').get(verifyRole('user', 'admin'), getCoupons);

/**
 * @swagger
 * /coupons:
 *   post:
 *     summary: Create a new coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coupon'
 *     responses:
 *       201:
 *         description: Coupon created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.route('/').post(verifyRole('admin', 'manager'), createCouponValidator, createCoupon);

/**
 * @swagger
 * /coupons/{id}:
 *   get:
 *     summary: Get a coupon by ID
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The coupon ID
 *     responses:
 *       200:
 *         description: Coupon details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       400:
 *         description: Invalid ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Coupon not found
 */
router.route('/:id').get(verifyRole('user', 'admin'), checkIdValidator, getCoupon);

/**
 * @swagger
 * /coupons/{id}:
 *   put:
 *     summary: Update a coupon by ID
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The coupon ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coupon'
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Coupon not found
 */
router.route('/:id').put(verifyRole('admin', 'manager'), checkIdValidator, updateCoupon);

/**
 * @swagger
 * /coupons/{id}:
 *   delete:
 *     summary: Delete a coupon by ID
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The coupon ID
 *     responses:
 *       200:
 *         description: Coupon deleted successfully
 *       400:
 *         description: Invalid ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Coupon not found
 */
router.route('/:id').delete(verifyRole('admin', 'manager'), checkIdValidator, deleteCoupon);


module.exports = router