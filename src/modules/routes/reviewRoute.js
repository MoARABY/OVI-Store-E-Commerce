const {createReviewValidator,updateReviewValidator,deleteReviewValidator,checkIdValdidator} = require('../validators/reviewValidator')
const {createReview,getReview,getReviews,updateReview,deleteReview} = require('../controllers/reviewController')
const {verifyRole} = require('../../guards/isAuthorized')

const router = require('express').Router({mergeParams:true})


router.get('/',verifyRole('user','admin'),getReviews)
router.post('/',verifyRole('user'),createReviewValidator,createReview)
router.get('/:id',verifyRole('user'),checkIdValdidator,getReview)
router.put('/:id',verifyRole('user'),updateReviewValidator,updateReview)
router.delete('/:id',verifyRole('user'),deleteReviewValidator,deleteReview)



module.exports = router