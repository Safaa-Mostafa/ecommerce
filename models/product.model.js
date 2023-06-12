const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "Too short product title"],
    maxLength: [100, "Too long product title"],
  },
  slug: {
    type: String,
    lowercase: true,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    minLength: [20, "Too short product description"],
  },
  quantity: {
    type: Number,
    required: [true, "product quantity is required"],
  },
  sold: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "product price is required"],
    trim: true,
    maxLength: [2000000000, "too long product price"],
  },
  priceAfterDiscount: {
    type: Number,
  },
  colors: [String],
  images: [String],
  imageCover: {
    type: String,
    required: [true, "product image cover is required"],
  },
  category:{
    type:mongoose.Schema.ObjectId,
    ref:'category',
    required:[true,'Product must be belong to category']
  },
  subcategory:[{
    type:mongoose.Schema.ObjectId,
    ref:'sub_category',
  }],
  brand:{
    type:mongoose.Schema.ObjectId,
    ref:'brand'
  }, 
  rating:{
type:Number,
min:[1,'Rating must be above or equal 1.0'],
max:[5,'Rating must be below or equal 5.0']  
},
ratingQuantity:{
type:Number,
default:0
},
  createAt:{
    type:String,
    default:Date.now()
  },
  updateAt:{
    type:String,
    default:Date.now()
  },
});
const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
