const {setImageUrl,setCategoryIdValue,createSubCategoryValidator,checkIdValidator,updateSubCategoryValidator} = require('../validators/subCategoryValidator')
const {verifyRole} = require('../../guards/isAuthorized')
const  {createSubCategory,getSubCategory,getSubCategories,updateSubCategory,deleteSubCategory} = require('../controllers/subCategoryController')
const {upload} = require('../../middlewares/uploadImage')
const router = require('express').Router({mergeParams:true})


/**
 * @swagger
 * components:
 *   schemas:
 *     SubCategory:
 *       type: object
 *       required:
 *         - name
 *         - categoryId
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the subcategory
 *         categoryId:
 *           type: string
 *           description: The ID of the parent category
 *         subCategoryImage:
 *           type: string
 *           description: URL of the subcategory's image
 *       example:
 *         name: Smartphones
 *         categoryId: 64f1b1b1b1b1b1b1b1b1b1b1
 *         subCategoryImage: https://example.com/smartphones.jpg
 */

/**
 * @swagger
 * tags:
 *   name: SubCategories
 *   description: Subcategory management routes
 */

/**
 * @swagger
 * /subcategories:
 *   get:
 *     summary: Get all subcategories
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubCategory'
 *       403:
 *         description: Forbidden
 */
router.get('/', verifyRole('admin', 'user'), getSubCategories);

/**
 * @swagger
 * /subcategories:
 *   post:
 *     summary: Create a new subcategory (Admin or Manager only)
 *     tags: [SubCategories]
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
 *               categoryId:
 *                 type: string
 *               subCategoryImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.post('/', verifyRole('admin', 'manager'), setCategoryIdValue, upload.single('subCategoryImage'), setImageUrl, createSubCategoryValidator, createSubCategory);

/**
 * @swagger
 * /subcategories/{id}:
 *   get:
 *     summary: Get a subcategory by ID
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subcategory ID
 *     responses:
 *       200:
 *         description: Subcategory details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Invalid ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Subcategory not found
 */
router.get('/:id', verifyRole('user'), checkIdValidator, getSubCategory);

/**
 * @swagger
 * /subcategories/{id}:
 *   put:
 *     summary: Update a subcategory by ID (Admin or Manager only)
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subcategory ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategory'
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Subcategory not found
 */
router.put('/:id', verifyRole('admin', 'manager'), updateSubCategoryValidator, updateSubCategory);

/**
 * @swagger
 * /subcategories/{id}:
 *   delete:
 *     summary: Delete a subcategory by ID (Admin or Manager only)
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subcategory ID
 *     responses:
 *       200:
 *         description: Subcategory deleted successfully
 *       400:
 *         description: Invalid ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Subcategory not found
 */
router.delete('/:id', verifyRole('admin', 'manager'), checkIdValidator, deleteSubCategory);


module.exports = router