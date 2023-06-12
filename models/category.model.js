const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category required"],
      unique: [true, "category must be unique"],
      minlength: [3, "massage too short category name"],
      maxlength: [32, "Too long category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
    createAt:{
      type:String,
    },
    updateAt:{
      type:String,
    }
  });

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
