const router = require('express').Router()

const {signUp,sendOTP,verifyOTP,logIn,forgotPassword,resetPassword,verifyResetCode} = require('../controllers/authController')
const {createUserValidator} = require('../validators/userValidator')
const {verifyRole} = require('../../guards/isAuthorized')
const verifyToken = require('../../middlewares/verifyToken')


router.post('/signup',createUserValidator,signUp)
router.post('/send-otp',verifyToken,sendOTP)
router.post('/verify-otp',verifyToken,verifyOTP)
router.post('/login',logIn)
router.post('/forgot-password',verifyToken,forgotPassword)
router.post('/verify-reset-code',verifyToken,verifyResetCode)
router.post('/reset-password',verifyToken,resetPassword)

module.exports = router