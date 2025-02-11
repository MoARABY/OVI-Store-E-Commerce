const router = require('express').Router()

const {signUp,sendOTP,verifyOTP,logIn,forgotPassword,resetPassword,verifyResetCode} = require('../controllers/authController')
const {createUserValidator} = require('../validators/userValidator')
const {verifyRole} = require('../../guards/isAuthorized')
const verifyToken = require('../../middlewares/verifyToken')
const limiter = require('../../middlewares/rateLimiter')


router.post('/signup',limiter,createUserValidator,signUp)
router.post('/send-otp',verifyRole('user'),sendOTP)
router.post('/verify-otp',verifyRole('user'),verifyOTP)
router.post('/login',limiter,logIn)
router.post('/forgot-password',verifyRole('admin','user'),forgotPassword)
router.post('/verify-reset-code',verifyRole('admin','user'),verifyResetCode)
router.post('/reset-password',verifyRole('admin','user'),resetPassword)

module.exports = router