const { check } = require("express-validator");
const validatorMiddleware = require("../middleware/validatorMiddleware");
const categoryModel = require("../models/category.model")

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("title need be required")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars"),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Too long description"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("product quantity must be number"),
  check("price")
    .notEmpty()
    .withMessage("product price is required")
    .isLength({ max: 32 })
    .withMessage("too long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("product after discount must be number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error('priceAfterDiscount must be lower than price');
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("availableColors should be array of string"),
  check("imageCover").notEmpty().withMessage("product imageCover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid Id format").custom((value)=>categoryModel.findById(value).then((category)=>{
      if(!category){
        return Promise.reject(new Error (`No category for this id:${value}`))
      }
    })),
  check("subcategory").optional().isMongoId().withMessage("Invalid Id format"),
  check("brand").optional().isMongoId().withMessage("Invalid Id format"),
  check("ratingAverage")
    .optional()
    .isNumeric()
    .withMessage("rating average must be number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),
  check("ratingsQuantity must be a number"),
  validatorMiddleware,
];
exports.getProductValidator = [
    check('id').isMongoId().withMessage('Invalid ID format'),
    validatorMiddleware
];
exports.updateProductValidator = [
    check('id').isMongoId().withMessage('Invalid ID format'),
    validatorMiddleware
];
exports.deleteProductValidator = [
    check('id').isMongoId().withMessage('Invalid ID format'),
    validatorMiddleware
];

