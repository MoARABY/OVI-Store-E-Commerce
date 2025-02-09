const {createCoupon,getCoupon,getCoupons,updateCoupon,deleteCoupon} = require('../controllers/couponController')
const {createCouponValidator,checkIdValidator} = require('../../modules/validators/couponValidator')
const {verifyRole} = require('../../guards/isAuthorized')
const router = require('express').Router()


router.route('/').get(verifyRole('user','admin'),getCoupons)
.post(verifyRole('admin','manager'),createCouponValidator,createCoupon)
router.route('/:id').get(verifyRole('user','admin'),checkIdValidator,getCoupon)
.put(verifyRole('admin','manager'),checkIdValidator,updateCoupon)
.delete(verifyRole('admin','manager'),checkIdValidator,deleteCoupon)


module.exports = router