const router = require("express").Router();
const productServices = require("../services/productServices");
const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/productValidator");

router.route('/').get(productServices.getProducts).post(createProductValidator, productServices.createProduct);
router
  .route('/:id')
  .get(getProductValidator, productServices.getProduct)
  .put(updateProductValidator, productServices.updateProduct)
  .delete(deleteProductValidator, productServices.deleteProduct);
module.exports = router;
