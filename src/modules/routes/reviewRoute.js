const {createReviewValidator,updateReviewValidator,deleteReviewValidator,checkIdValdidator} = require('../validators/reviewValidator')
const {createReview,getReview,getReviews,updateReview,deleteReview} = require('../controllers/reviewController')
const {verifyRole} = require('../../guards/isAuthorized')

const router = require('express').Router({mergeParams:true})


/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - rating
 *         - comment
 *       properties:
 *         rating:
 *           type: number
 *           description: The rating given by the user (1 to 5)
 *         comment:
 *           type: string
 *           description: The review comment
 *       example:
 *         rating: 5
 *         comment: Excellent product!
 */

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review management routes
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       403:
 *         description: Forbidden
 */
router.get('/', verifyRole('user', 'admin'), getReviews);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review (User only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.post('/', verifyRole('user'), createReviewValidator, createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review ID
 *     responses:
 *       200:
 *         description: Review details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Review not found
 */
router.get('/:id', verifyRole('user'), checkIdValdidator, getReview);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update a review by ID (User only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Review not found
 */
router.put('/:id', verifyRole('user'), updateReviewValidator, updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID (User only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review ID
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       400:
 *         description: Invalid ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Review not found
 */
router.delete('/:id', verifyRole('user'), deleteReviewValidator, deleteReview);



module.exports = router