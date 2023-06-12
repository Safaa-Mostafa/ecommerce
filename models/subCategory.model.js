const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "SubCategory must be unique"],
      minlength: [2, "too short SubCategory name"],
      maxlength: [32, "too long SubCategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: [true, "SubCategory must be belong to parent category "],
    },
    createAt:{
      type:String,
      default:Date.now()
    },
    updateAt:{
      type:String,
      default:Date.now()
    }
  });

const subCategoryModel = mongoose.model("sub_category", subCategorySchema);
module.exports = subCategoryModel;
