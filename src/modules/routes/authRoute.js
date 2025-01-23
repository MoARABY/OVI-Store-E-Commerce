const router = require('express').Router()

const {signUp,sendOTP,verifyOTP,logIn,forgotPassword,resetPassword,verifyResetCode} = require('../controllers/authController')
const {createUserValidator} = require('../validators/userValidator')
const {verifyRole} = require('../../guards/isAuthorized')


router.post('/signup',createUserValidator,signUp)
router.post('/send-otp',verifyRole('user'),sendOTP)
router.post('/verify-otp',verifyRole('user'),verifyOTP)
router.post('/login',logIn)
router.post('/forgot-password',verifyRole('user'),forgotPassword)
router.post('/verify-reset-code',verifyRole('user'),verifyResetCode)
router.post('/reset-password',verifyRole('user'),resetPassword)

module.exports = router