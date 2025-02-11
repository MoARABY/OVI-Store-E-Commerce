const {setImageUrl,createCategoryValidator,checkIdValidator,updateCategoryValidator} = require('../validators/categoryValidator')
const {verifyRole} = require('../../guards/isAuthorized')
const {createCategory,getCategory,getCategories,updateCategory,deleteCategory} = require('../controllers/categoryController')
const subCategories = require('./subCategoryRoute')
const {upload} = require('../../middlewares/uploadImage')
const router = require('express').Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the category
 *         description:
 *           type: string
 *           description: A description of the category
 *         categoryImage:
 *           type: string
 *           description: URL of the category's image
 *       example:
 *         name: Electronics
 *         description: Devices and gadgets
 *         categoryImage: https://example.com/electronics.jpg
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management routes
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       403:
 *         description: Forbidden
 */
router.get('/', verifyRole('admin', 'user'), getCategories);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
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
 *               categoryImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.post('/', verifyRole('admin', 'manager'), upload.single('categoryImage'), setImageUrl, createCategoryValidator, createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 */
router.get('/:id', verifyRole('user'), checkIdValidator, getCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 */
router.put('/:id', verifyRole('admin', 'manager'), updateCategoryValidator, updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Invalid ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 */
router.delete('/:id', verifyRole('admin', 'manager'), checkIdValidator, deleteCategory);

/**
 * @swagger
 * /categories/{categoryId}/subCategories:
 *   get:
 *     summary: Get subcategories of a specific category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the parent category
 *     responses:
 *       200:
 *         description: A list of subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid category ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 */
router.use('/:categoryId/subCategories', subCategories);


module.exports = router