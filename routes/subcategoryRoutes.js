const router = require("express").Router({ mergeParams: true });
const sub_category = require("../services/subCategoryService");
const {
  addSubCategoryValidator,
  getSubCategoryValidator,
  deleteSubCategoryValidator,
  updateSubCategoryValidator,
} = require("../utils/subCategoryValidator");
router
  .route('/')
  .post(sub_category.setCategoryIdToBody, addSubCategoryValidator,   sub_category.addSubCategory)
  .get(sub_category.createFilterObject, sub_category.getSubCategoryByCategory);


router.get("/all", sub_category.allSubCategories);

router
  .route("/all/:id")
  .get(getSubCategoryValidator, sub_category.getSubCategory)
  .delete(deleteSubCategoryValidator, sub_category.deleteSubCategory)
  .put(updateSubCategoryValidator, sub_category.updateSubCategory);

module.exports = router;
