const productModel = require("../models/product.model");
const asyncHandler = require("express-async-handler");
const APIERROR = require("../utils/APIERROR");
const slugify = require("slugify");
const moment = require("moment");
class product {
  // @desc create brand
  //@route POST /api/v1/brand/
  // @access private

  static createProduct = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.title);
    req.body.updateAt = moment().format("MMMM Do YYYY, h:mm:ss a");
    req.body.createAt = moment().format("MMMM Do YYYY, h:mm:ss a");
    const brand = await productModel.create(req.body);
    await brand.save();
    res.status(201).json({
      apiStatus: true,
      data: brand,
      message: "brand added success",
    });
  });

  // @desc get list of products
  //@route GET /api/v1/product/
  // @access public

  static getProducts = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const products = await productModel.find({}).skip(skip).limit(limit).populate({path:'category',select:'name -_id'});
    res.status(200).json({
      apiStatus: true,
      data: products,
      nHbit: products.length,
      message: "all products fetched success",
    });
  });
  // @desc get specific product by id
  //@route GET /api/v1/product/:id
  // @access public

  static getProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await productModel.findById(id).populate({path:'category',select:'name -_id'});
    if (!product) {
      return next(new APIERROR(`No category for this ${id}`, 404));
    }
    res.status(200).json({
      apiStatus: true,
      message: "product fetched success",
      data: product,
    });
  });

  //@desc update specific product by id
  //@ PUT /api/v1/product/:id
  //$access private
  static updateProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
   if(req.body.title){
    req.body.slug = slugify(req.body.title);
   }
    req.body.updateAt = moment().format("MMMM Do YYYY, h:mm:ss a");
    const product = await productModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    if (!product) {
      return next(new APIERROR(`no product for this ${id}`, 404));
    }
    await product.save();
    res.status(200).json({
      apiStatus: true,
      data: product,
      message: "product updated success ",
    });
  });
  //@desc delete specific product by id
  //@ DELETE /api/v1/brand/all/:id
  //$access private
  static deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete({ _id: id });
    if (!product) {
      return next(new APIERROR(`no product for this id ${id}`, 404));
    }
    res.status(204).send();
  });
}

module.exports = product;
