const {check} = require('express-validator')
const asyncHandler = require('express-async-handler')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const userModel = require('../../../DB/models/userModel')


const createUserValidator = [
    check('name').notEmpty().withMessage('Please provide a name'),
    check('email').notEmpty().withMessage('Please provide an email')
    .isEmail().withMessage('Invalid email address')
    .custom(asyncHandler(async (val)=>{
        const user = await userModel.findOne({email:val})
        if(user) throw new Error('Email already exists')
    })),
    
    check('phone').notEmpty().withMessage('Please provide a phone number')
    .isMobilePhone(['ar-EG', 'ar-SA'])
    .withMessage('Invalid phone number only accepted Egy and SA Phone numbers')
    .custom(asyncHandler(async (val)=>{
        const user = await userModel.findOne({phone:val})
        if(user) throw new Error('Phone number already exists')
    })),
    
    check('password').notEmpty().withMessage('Please provide a password')
    .isLength({min:6}).withMessage('Password must be at least 6 characters long')
    .custom((val,{req})=>{
        if(val !== req.body.confirmPassword) throw new Error('Password and confirm password do not match')
        return true
    }),

    check('confirmPassword').notEmpty().withMessage('Please provide a confirm password'),
    validatorMiddleware
]

const getUserValidator = [
    check('id').isMongoId().withMessage('Invalid Id Format'),
    validatorMiddleware
]

const updateUserValidator = [
    check('id').isMongoId().withMessage('Invalid Id Format'),
    check('email').optional()
    .isEmail().withMessage('Invalid email address')
    .custom(asyncHandler(async (val)=>{
        const user = await userModel.findOne({email:val})
        if(user) throw new Error('Email already exists')
    })),
    
    check('phone').optional()
    .isMobilePhone(['ar-EG', 'ar-SA'])
    .withMessage('Invalid phone number only accepted Egy and SA Phone numbers')
    .custom(asyncHandler(async (val)=>{
        const user = await userModel.findOne({phone:val})
        if(user) throw new Error('Phone number already exists')
    })),
    
    validatorMiddleware
]


module.exports = {createUserValidator,getUserValidator,updateUserValidator}