const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "brand  required"],
    unique: [true, "brand must be unique"],
    minLength: [2, "Too short brand name"],
    maxLength: [32, "Too long brand name"],
  },
  slug: {
    type: String,
    lowercase: true,
  },
  img: {},
  createAt: {
    type: String,
    default: Date.now(),
  },
  updateAt: {
    type: String,
    default: Date.now(),
  },
});

const brandModel = mongoose.model('brand',brandSchema)

module.exports = brandModel