const {createProductValidator,updateProductValidator,checkIdValidator,setImageUrl} = require('../validators/productValidator')
const {verifyRole} = require('../../guards/isAuthorized')
const {createProduct,getProduct,getProducts,updateProduct,deleteProduct} = require('../controllers/productController')
const {upload,uploads} = require('../../middlewares/uploadImage')
const reviewRouter = require('../routes/reviewRoute')
const router = require('express').Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: A description of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         productImage:
 *           type: string
 *           description: URL of the product's main image
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs of additional product images
 *       example:
 *         name: Smartphone X
 *         description: A high-end smartphone with advanced features
 *         price: 999.99
 *         productImage: https://example.com/smartphone-x.jpg
 *         images:
 *           - https://example.com/smartphone-x-1.jpg
 *           - https://example.com/smartphone-x-2.jpg
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management routes
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       403:
 *         description: Forbidden
 */
router.get('/', verifyRole('user', 'admin'), getProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product (Admin or Manager only)
 *     tags: [Products]
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
 *               price:
 *                 type: number
 *               productImage:
 *                 type: string
 *                 format: binary
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.post('/', verifyRole('manager', 'admin'), upload.fields([{ name: 'images', maxCount: 5 }, { name: 'productImage', maxCount: 1 }]), uploads, createProductValidator, createProduct);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */
router.get('/:id', verifyRole('user'), checkIdValidator, getProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID (Admin or Manager only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */
router.put('/:id', verifyRole('manager', 'admin'), updateProductValidator, updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID (Admin or Manager only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Invalid ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */
router.delete('/:id', verifyRole('manager', 'admin'), checkIdValidator, deleteProduct);

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
 * /products/{productId}/reviews:
 *   get:
 *     summary: Get all reviews for a product
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: A list of reviews for the product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid product ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */
router.use('/:productId/reviews', reviewRouter);

/**
 * @swagger
 * /products/{productId}/reviews/{reviewId}:
 *   get:
 *     summary: Get a specific review for a product
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the review
 *     responses:
 *       200:
 *         description: Review details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid product or review ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Review not found
 *   put:
 *     summary: Update a specific review for a product
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the review
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
 *   delete:
 *     summary: Delete a specific review for a product
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the review
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       400:
 *         description: Invalid product or review ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Review not found
 */
router.use('/:productId/reviews/:reviewId', reviewRouter);


module.exports = router