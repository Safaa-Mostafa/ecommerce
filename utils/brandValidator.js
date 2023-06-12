const {check } = require("express-validator")
const validatorMiddleware = require("../middleware/validatorMiddleware")

exports.createBrandValidator = [
    check('name').notEmpty().withMessage("brand required")
    .isLength({min:2}).withMessage("too short brand name")
    .isLength({max:32}).withMessage("too long brand name"),
    validatorMiddleware
]
exports.updateBrandValidator = [
    check('name').notEmpty().withMessage("brand required")
    .isLength({min:2}).withMessage("too short brand name")
    .isLength({max:32}).withMessage("too long brand name")
    ,check('id').isMongoId().withMessage('Invalid brand Id format'),
    validatorMiddleware,
];
exports.deleteBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand Id format'),
    validatorMiddleware
];
exports.getBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand Id format'),
validatorMiddleware,
]