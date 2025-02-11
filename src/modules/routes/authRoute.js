const router = require('express').Router()

const {signUp,sendOTP,verifyOTP,logIn,forgotPassword,resetPassword,verifyResetCode} = require('../controllers/authController')
const {createUserValidator} = require('../validators/userValidator')
const {verifyRole} = require('../../guards/isAuthorized')
const limiter = require('../../middlewares/rateLimiter')


/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         email: johndoe@example.com
 *         password: password123
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and authorization routes
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post('/signup', limiter, createUserValidator, signUp);

/**
 * @swagger
 * /send-otp:
 *   post:
 *     summary: Send OTP to user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       403:
 *         description: Forbidden
 */
router.post('/send-otp', verifyRole('user'), sendOTP);

/**
 * @swagger
 * /verify-otp:
 *   post:
 *     summary: Verify the OTP code
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP
 */
router.post('/verify-otp', verifyRole('user'), verifyOTP);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/login', limiter, logIn);

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reset instructions sent
 *       403:
 *         description: Forbidden
 */
router.post('/forgot-password', verifyRole('admin','user'), forgotPassword);

/**
 * @swagger
 * /verify-reset-code:
 *   post:
 *     summary: Verify password reset code
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reset code verified
 *       400:
 *         description: Invalid code
 */
router.post('/verify-reset-code', verifyRole('admin','user'), verifyResetCode);

/**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Validation error
 */
router.post('/reset-password', verifyRole('admin','user'), resetPassword);

module.exports = router