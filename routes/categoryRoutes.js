const router = require("express").Router();
const categoryServices = require("../services/categoryService");
const sub_category = require("../routes/subcategoryRoutes");
const {
  createCategoryValidator,
  getCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
} = require("../utils/categoryValidator");
router.post(
  "/add-category",
  createCategoryValidator,
  categoryServices.addCategory
);
router.get("/all", categoryServices.all_Categories);
router
  .route("/all/:id")
  .get(getCategoryValidator, categoryServices.getCategory)
  .delete(deleteCategoryValidator, categoryServices.deleteCategory)
  .put(updateCategoryValidator, categoryServices.updateCategory);
router.use("/:categoryId/subcategories", sub_category);

module.exports = router;
