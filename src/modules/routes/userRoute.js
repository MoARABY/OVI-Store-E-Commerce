const router = require('express').Router()
const {createUserValidator,getUserValidator,updateUserValidator} = require('../validators/userValidator')
const {createUser,getUser,getUsers,updateUser,deleteUser,getprofile,updateProfile,updateLoggedUserPassword,deActivateLoggedUser,activateLoggedUser} = require('../controllers/userController')
const {verifyRole} = require('../../guards/isAuthorized')


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         role:
 *           type: string
 *           description: The role of the user (e.g., user, admin, manager)
 *       example:
 *         name: John Doe
 *         email: johndoe@example.com
 *         password: password123
 *         role: user
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management routes
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden
 */
router.route('/').get(verifyRole('admin', 'manager'),getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.route('/').post(createUserValidator,verifyRole('admin'), createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.route('/:id').get(getUserValidator,verifyRole('admin', 'manager'), getUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.route('/:id').put(updateUserValidator,verifyRole('admin'), updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid ID
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.route('/:id').delete(getUserValidator,verifyRole('admin',), deleteUser);





// logged user
/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *       example:
 *         name: John Doe
 *         email: johndoe@example.com
 *
 *     PasswordUpdate:
 *       type: object
 *       required:
 *         - currentPassword
 *         - newPassword
 *       properties:
 *         currentPassword:
 *           type: string
 *           description: The current password of the user
 *         newPassword:
 *           type: string
 *           description: The new password for the user
 *       example:
 *         currentPassword: oldPassword123
 *         newPassword: newPassword123
 */

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile management routes
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get the logged-in user's profile (User only)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user's profile details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       403:
 *         description: Forbidden
 */
router.route('/profile').get(verifyRole('user'), getprofile);

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update the logged-in user's profile (User only)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.route('/profile').put(verifyRole('user'), updateProfile);

/**
 * @swagger
 * /profile:
 *   delete:
 *     summary: Deactivate the logged-in user's account (User only)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deactivated successfully
 *       403:
 *         description: Forbidden
 */
router.route('/profile').delete(verifyRole('user'), deActivateLoggedUser);

/**
 * @swagger
 * /profile/change-password:
 *   put:
 *     summary: Change the logged-in user's password (User only)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PasswordUpdate'
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.route('/profile/change-password').put(verifyRole('user'), updateLoggedUserPassword);

/**
 * @swagger
 * /profile/activate:
 *   put:
 *     summary: Activate the logged-in user's account (User only)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account activated successfully
 *       403:
 *         description: Forbidden
 */
router.route('/profile/activate').put(verifyRole('user'), activateLoggedUser);

module.exports = router
