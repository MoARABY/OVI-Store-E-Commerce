const router = require('express').Router({mergeParams:true})
const {createReview,geteReview,getReviews,updateReview,deleteReview,getProductReviews,getProductReview,createProductReview} =  require('../controllers/reviewController')
const {createReviewValidator,getReviewValidator,updateReviewValidator,deleteReviewValidator} = require('../validators/reviewValidator') 
const {verifyRole} = require('../middlewares/verifyToken')


router.route('/').get(verifyRole('user','admin'),getReviews)
.post(verifyRole('user'),createReviewValidator,createReview)

router.route('/:id').get(verifyRole('user'),getReviewValidator,geteReview)
.put(verifyRole('user'),updateReviewValidator,updateReview)
.delete(verifyRole('user','admin'),deleteReviewValidator,deleteReview)

router.route('/').get(verifyRole('user'),getProductReviews)
// .post(verifyRole('user'),createProductReview)

router.route('/:reviewId')
.get(verifyRole('user'),getProductReview)




module.exports = router