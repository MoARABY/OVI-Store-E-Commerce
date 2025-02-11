const {setImageUrl,createBrandValidator,checkIdValidator,updateBrandValidator} = require('../validators/brandValidator')
const {verifyRole} = require('../../guards/isAuthorized')
const  {createBrand,getBrand,getBrands,updateBrand,deleteBrand} = require('../controllers/brandController')
const {upload} = require('../../middlewares/uploadImage')
const router = require('express').Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the brand
 *         description:
 *           type: string
 *           description: A description of the brand
 *         brandImage:
 *           type: string
 *           description: URL of the brand's image
 *       example:
 *         name: Nike
 *         description: A global leader in athletic footwear and apparel
 *         brandImage: https://example.com/nike.jpg
 */

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Brand management routes
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 *       403:
 *         description: Forbidden
 */
router.get('/', verifyRole('user'), getBrands);

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               brandImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Brand created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.post('/', verifyRole('admin'), upload.single('brandImage'), setImageUrl, createBrandValidator, createBrand);

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand ID
 *     responses:
 *       200:
 *         description: Brand details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Invalid ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Brand not found
 */
router.get('/:id', verifyRole('user'), checkIdValidator, getBrand);

/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     summary: Update a brand by ID
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Brand not found
 */
router.put('/:id', verifyRole('admin', 'manager'), updateBrandValidator, updateBrand);

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand ID
 *     responses:
 *       200:
 *         description: Brand deleted successfully
 *       400:
 *         description: Invalid ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Brand not found
 */
router.delete('/:id', verifyRole('admin', 'manager'), checkIdValidator, deleteBrand);


module.exports = router