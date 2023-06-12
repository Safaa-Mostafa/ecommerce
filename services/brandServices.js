const brandModel = require("../models/brand.model");
const asyncHandler = require("express-async-handler");
const APIERROR = require("../utils/APIERROR")
const slugify = require("slugify");
const moment= require("moment")
class category {
  // @desc create brand
  //@route POST /api/v1/brand/
  // @access private

  static createBrand = asyncHandler(async (req, res) => {
    const {name} = req.body;
    const brand = await brandModel.create({ name, slug: slugify(name),updateAt:moment().format('MMMM Do YYYY, h:mm:ss a'),
    createAt:moment().format('MMMM Do YYYY, h:mm:ss a') });
    await brand.save();
    res.status(201).json({
      apiStatus: true,
      data: brand,
      message: "brand added success",
    });
  });

  // @desc get list of brands
  //@route GET /api/v1/brand/
  // @access public

  static all_Brands = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const brands = await brandModel.find({}).skip(skip).limit(limit);
    res.status(200).json({
      apiStatus: true,
      data: brands,
      nHbit: brands.length,
      message: "all brands fetched success",
    });
  });
  // @desc get specific brand
  //@route GET /api/v1/brand/:id
  // @access public

  static getBrand = asyncHandler(async (req, res,next) => {
    const { id } = req.params;
    const brand = await brandModel.findById(id);
    if (!brand) {
   return next(new APIERROR(`No category for this ${id}`,404))
    }
    res.status(200).json({
      apiStatus: true,
      message: "brand fetched success",
      data: brand,
    });
  });

  //@desc update specific brand
  //@ PUT /api/v1/brand/:id
  //$access private
  static updateBrand = asyncHandler(async (req, res,next) => {
    const { id } = req.params;
    const name = req.body.name;
    const brand = await brandModel.findByIdAndUpdate(
      { _id: id },
      { name, slug: slugify(name),updateAt:moment().format('MMMM Do YYYY, h:mm:ss a') },   
    {
      new:true
    }
    );
    if (!brand) {
     return next(new APIERROR(`no brand for this ${id}`,404))
    }
    await brand.save();
    res.status(200).json({
      apiStatus: true,
      data: brand,
      message: "brand updated success ",
    });
  });
  //@desc delete specific brand
  //@ DELETE /api/v1/brand/all/:id
  //$access private
  static deleteBrand = asyncHandler(async (req, res,next) => {
    const { id } = req.params;
    const brand = await brandModel.findByIdAndDelete({ _id: id });
    if (!brand) {
      return next(new APIERROR(`no brand for this id ${id}`,404))
    }
    res.status(204).send();
  });
}

module.exports = category;
