const {getAddresses,addToAddresses,removeFromAddresses} = require('../controllers/addressController')
const {verifyRole} = require('../../guards/isAuthorized')
const router = require('express').Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - street
 *         - city
 *         - state
 *         - zipCode
 *       properties:
 *         street:
 *           type: string
 *           description: The street address
 *         city:
 *           type: string
 *           description: The city of the address
 *         state:
 *           type: string
 *           description: The state of the address
 *         zipCode:
 *           type: string
 *           description: The zip code of the address
 *       example:
 *         street: 123 Main St
 *         city: Anytown
 *         state: CA
 *         zipCode: 12345
 */

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: User address management routes
 */

/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Get all addresses for the user
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 *       403:
 *         description: Forbidden
 */
router.route('/').get(verifyRole('user'), getAddresses);

/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Add a new address for the user
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address added successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.route('/').post(verifyRole('user'), addToAddresses);

/**
 * @swagger
 * /addresses/{id}:
 *   delete:
 *     summary: Delete an address by ID
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address ID
 *     responses:
 *       200:
 *         description: Address deleted successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Address not found
 */
router.route('/:id').delete(verifyRole('user'), removeFromAddresses);


module.exports = router