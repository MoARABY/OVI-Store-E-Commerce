const {check} = require('express-validator');
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const userModel = require('../models/userModel')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const bcrypt =  require('bcrypt')



const createUserValidator = [
    check('name').notEmpty().withMessage('Please provide a name')
    .isLength({min:3}).withMessage('Name must be at least 3 characters long')
    .custom((val,{req})=>{
        req.body.slug = slugify(val)
        return true
    }),
    
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
    check('name').optional()
    .custom((val,{req})=>{
        req.body.slug = slugify(val)
        return true
    }),
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

const changeUserPasswordValidator = [
    check('id').isMongoId().withMessage('Invalid Id Format'),
    check('currentPassword').notEmpty().withMessage('Please provide a current password')
    .custom(asyncHandler(async (val,{req})=>{
        const user = await userModel.findById(req.params.id)
        if(!user) throw new Error('User not found')
        const isMatch = await bcrypt.compare(val,user.password)
        if(!isMatch) throw new Error('Current password is incorrect')
    })),

    check('confirmPassword').notEmpty().withMessage('Please provide a password confirmation'),

    check('newPassword').notEmpty().withMessage('Please provide a new password')
    .isLength({min:6}).withMessage('Password must be at least 6 characters long')
    .custom((val,{req})=>{
        if(val !== req.body.confirmPassword) throw new Error('Password and confirm password do not match')
        req.body.password = val
        return true
    }),
    validatorMiddleware
]

const deleteUserValidator = [
    check('id').isMongoId().withMessage('Invalid Id Format'),
    validatorMiddleware
]


module.exports = {createUserValidator,getUserValidator,updateUserValidator,changeUserPasswordValidator,deleteUserValidator}