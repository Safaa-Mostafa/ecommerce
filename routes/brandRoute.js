const router = require("express").Router({ mergeParams: true });
const brandServices = require("../services/brandServices");
const {
  createBrandValidator,
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/brandValidator");
router
  .route("/")
  .post(createBrandValidator, brandServices.createBrand)
  .get(brandServices.all_Brands);
router
  .route("/:id")
  .get(getBrandValidator, brandServices.getBrand)
  .put(updateBrandValidator, brandServices.updateBrand)
  .delete(deleteBrandValidator, brandServices.deleteBrand);

module.exports = router;
