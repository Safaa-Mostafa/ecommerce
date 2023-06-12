const {check} = require("express-validator")
const validatorMiddleware = require("../middleware/validatorMiddleware")


exports.addSubCategoryValidator = [
check('name').notEmpty().withMessage("subCategory required").isLength({min:2})
.withMessage("too short subCategory name")
.isLength({max:32}).withMessage("too long SubCategory name"),
 check('category').isMongoId().withMessage("invalid category id format"),
 validatorMiddleware
]
exports.getSubCategoryValidator = [
    check('id').isMongoId().withMessage("invalid id format"),
    validatorMiddleware
]

exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage("invalid id format"),
    validatorMiddleware
]

exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage("invalid id format"),
    check('name').notEmpty().withMessage(`subCategory is required`)
    .isLength({min:2}).withMessage("too short subCategory name")
    .isLength({max:32}).withMessage("too long SubCategory name"),
     validatorMiddleware
]