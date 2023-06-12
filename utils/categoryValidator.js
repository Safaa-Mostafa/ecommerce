const {check} = require("express-validator")
const validatorMiddleware = require("../middleware/validatorMiddleware")
exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category Id format'),
validatorMiddleware,
]
exports.createCategoryValidator = [
    check('name').notEmpty().withMessage("category required")
    .isLength({min:3}).withMessage("too short category name")
    .isLength({max:32}).withMessage("too long category name"),
    validatorMiddleware
];


exports.updateCategoryValidator = [
    check('name').notEmpty().withMessage("category required")
    .isLength({min:3}).withMessage("too short category name")
    .isLength({max:32}).withMessage("too long category name")
    ,check('id').isMongoId().withMessage('Invalid category Id format'),
    validatorMiddleware,
];
exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category Id format'),
    validatorMiddleware
];