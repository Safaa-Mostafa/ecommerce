const SubcategoryModel = require("../models/subCategory.model");
const asyncHandler = require("express-async-handler");
const APIERROR = require("../utils/APIERROR");
const slugify = require("slugify");
const moment = require("moment");
class SubCategory {
  // @desc create subcategory
  //@route POST /api/v1/sub-category/add-subcategory
  // @access private
  static setCategoryIdToBody = (req, res, next) => {
    if (!req.body.category) req.body.category = req.params.categoryId;
    next();
  };
  static addSubCategory = asyncHandler(async (req, res) => {
    const { name, category } = req.body;
    const subcategory = await SubcategoryModel.create({
      name,
      slug: slugify(name),
      category,
      updateAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      createAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
    await subcategory.save();
    res.status(201).json({
      apiStatus: true,
      data: subcategory,
      message: "SubCategory added success",
    });
  });

  // @desc get list of subCategories
  //@route GET /api/v1/sub-category/all
  // @access public

  static allSubCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const subCategories = await SubcategoryModel.find({})
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      apiStatus: true,
      data: subCategories,
      nHbit: subCategories.length,
      message: "all subCategories fetched success",
    });
  });
  // @desc get specific category
  //@route GET /api/v1/sub-category/all/:id
  // @access public

  static getSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await SubcategoryModel.findById(id);
    if (!category) {
      return next(new APIERROR(`No category for this ${id}`, 404));
    }
    res.status(200).json({
      apiStatus: true,
      message: "category fetched success",
      data: category,
    });
  });

  //@desc update specific category
  //@ PUT /api/v1/sub-category/all/:id
  //$access private
  static updateSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const name = req.body.name;
    const subcategory = await SubcategoryModel.findByIdAndUpdate(
      { _id: id },
      {
        name,
        slug: slugify(name),
        updateAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      },
      {
        new: true,
      }
    );
    if (!subcategory) {
      return next(new APIERROR(`no category for this ${id}`, 404));
    }
    await subcategory.save();
    res.status(200).json({
      apiStatus: true,
      data: subcategory,
      message: "subcategory updated success ",
    });
  });
  //@desc delete specific category
  //@ DELETE /api/v1/sub-category/all/:id
  //$access private
  static deleteSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subCategory = await SubcategoryModel.findByIdAndDelete({ _id: id });
    if (!subCategory) {
      return next(new APIERROR(`no category for this id ${id}`, 404));
    }
    res.status(204).send();
  });
  static createFilterObject = asyncHandler((req, res, next) => {
    let filterObject = {};
    if (req.params.categoryId)
      filterObject = { category: req.params.categoryId };
    req.filterObject = filterObject;
    next();
  });
  static getSubCategoryByCategory = asyncHandler(async (req, res, next) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    const subCategory = await SubcategoryModel
      .find(req.filterObject)
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      results: subCategory.length,
      page,
      data: subCategory,
    });
  });
}

module.exports = SubCategory;
