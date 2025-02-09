const asyncHandler = require('express-async-handler');
const couponModel = require('../../../DB/models/couponModel')



const createCoupon = asyncHandler(async (req, res) => {
    const coupon = await couponModel.create(req.body);
    coupon ? res.status(201).json(coupon) : res.status(400).json({ message: 'Invalid coupon data' });
})

const getCoupons = asyncHandler(async (req, res) => {
    const coupons = await couponModel.find();
    coupons ? res.status(200).json(coupons) : res.status(404).json({ message: 'No coupons found' });
})

const getCoupon = asyncHandler(async (req, res) => {
    const coupon = await couponModel.findById(req.params.id);
    coupon ? res.status(200).json(coupon) : res.status(404).json({ message: 'Coupon not found' });
})

const updateCoupon = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const coupon = await couponModel.findByIdAndUpdate(id, req.body, { new: true });
    coupon ? res.status(200).json(coupon) : res.status(404).json({ message: 'Coupon not found' });
})


const deleteCoupon = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const coupon = await couponModel.findByIdAndDelete(id, { new: true });
    coupon ? res.status(200).json({ message: 'Coupon deleted' }) : res.status(404).json({ message: 'Coupon not found' });
})

module.exports = {createCoupon,getCoupon,getCoupons,updateCoupon,deleteCoupon}