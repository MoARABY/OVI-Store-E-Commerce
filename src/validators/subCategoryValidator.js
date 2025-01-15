const { check,body } = require('express-validator');
const slugify = require('slugify')
const validatorMiddleware = require('../middlewares/validatorMiddleware')




const getSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    validatorMiddleware,
];

const createSubCategoryValidator = [
    check('name')
    .notEmpty()
    .withMessage('SubCategory required')
    .isLength({ min: 2 })
    .withMessage('Too short Subcategory name')
    .isLength({ max: 32 })
    .withMessage('Too long Subcategory name').custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    }),
    body('category').optional().isMongoId().withMessage('Invalid Subcategory id format'),
    validatorMiddleware,
];

const setCategoryIdValue = (req,res,next)=>{
    if(!req.body.category) req.body.category = req.params.categoryId
    next()
}

const updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    body('name').custom((val,{req})=>{
        req.body.slug = slugify(val)
        return true
    }),
    validatorMiddleware,
];

const deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory id format'),
    validatorMiddleware,
];


module.exports = {getSubCategoryValidator,createSubCategoryValidator,setCategoryIdValue,updateSubCategoryValidator,deleteSubCategoryValidator}