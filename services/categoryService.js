const categoryModel = require("../models/category.model");
const asyncHandler = require("express-async-handler");
const APIERROR = require("../utils/APIERROR")
const slugify = require("slugify");
const moment= require("moment")
class category {
  // @desc create category
  //@route POST /api/v1/category/add-category
  // @access private

  static addCategory = asyncHandler(async (req, res) => {
    const {name} = req.body;
    const category = await categoryModel.create({ name, slug: slugify(name),updateAt:moment().format('MMMM Do YYYY, h:mm:ss a'),
    createAt:moment().format('MMMM Do YYYY, h:mm:ss a') });
    await category.save();
    res.status(201).json({
      apiStatus: true,
      data: category,
      message: "category added success",
    });
  });

  // @desc get list of categories
  //@route GET /api/v1/category/all
  // @access public

  static all_Categories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const categories = await categoryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({
      apiStatus: true,
      data: categories,
      nHbit: categories.length,
      message: "all categories fetched success",
    });
  });
  // @desc get specific category
  //@route GET /api/v1/category/all/:id
  // @access public

  static getCategory = asyncHandler(async (req, res,next) => {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    if (!category) {
   return next(new APIERROR(`No category for this ${id}`,404))
    }
    res.status(200).json({
      apiStatus: true,
      message: "category fetched success",
      data: category,
    });
  });

  //@desc update specific category
  //@ PUT /api/v1/category/all/:id
  //$access private
  static updateCategory = asyncHandler(async (req, res,next) => {
    const { id } = req.params;
    const name = req.body.name;
    const category = await categoryModel.findByIdAndUpdate(
      { _id: id },
      { name, slug: slugify(name),updateAt:moment().format('MMMM Do YYYY, h:mm:ss a') },   
      {
        new:true
      }  
    );
    if (!category) {
     return next(new APIERROR(`no category for this ${id}`,404))
    }
    await category.save();
    res.status(200).json({
      apiStatus: true,
      data: category,
      message: "category updated success ",
    });
  });
  //@desc delete specific category
  //@ DELETE /api/v1/category/all/:id
  //$access private
  static deleteCategory = asyncHandler(async (req, res,next) => {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete({ _id: id });
    if (!category) {
      return next(new APIERROR(`no category for this id ${id}`,404))
    }
    res.status(204).send();
  });
}

module.exports = category;
