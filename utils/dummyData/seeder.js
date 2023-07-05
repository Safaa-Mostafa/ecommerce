const fs = require("fs");
const dotenv = require("dotenv");
const Product = require("../../models/product.model");
const dbConnect = require("../../config/database");

dotenv.config({ path: "../../config.env" });
dbConnect();
const products = JSON.parse(fs.readFileSync("./product.json"));
const insertData = async () => {
  try {
    await Product.create(products);
    process.exit();
  } catch (e) {
    console.log(error);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

if (process.argv[2] == "-i") {
  insertData();
} else if (process.argv[2] == "-d") {
  destroyData();
}
