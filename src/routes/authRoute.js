const router = require('express').Router()
const  {signUp,login,forgotPassword,verifyResetCode,resetPassword} = require('../controllers/authController')
const {signUpValidator,logInValidator} = require('../validators/authValidator')
const Limiter = require('../middlewares/rateLimiter')

router.post('/signup',Limiter,signUpValidator,signUp)
router.post('/login',Limiter,logInValidator,login)
router.post('/forget-password',Limiter,forgotPassword)
router.post('/verify-reset-code',verifyResetCode)
router.post('/reset-password',resetPassword)

module.exports = router