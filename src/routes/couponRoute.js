const {createCouponValidator,getCouponValidator,updateCouponValidator,deleteCouponValidator} = require('../validators/couponValidator') 
const {createCoupon,getCoupons,getCoupon,updateCoupon,deleteCoupon} = require('../controllers/couponController')
const {verifyRole} = require('../middlewares/verifyToken')
const router = require('express').Router()


router.route('/').post(verifyRole('admin'),createCouponValidator,createCoupon).get(getCoupons)
router.route('/:id').get(getCouponValidator,getCoupon).put(verifyRole('admin'),updateCouponValidator,updateCoupon).delete(verifyRole('admin'),deleteCouponValidator,deleteCoupon)

module.exports = router






