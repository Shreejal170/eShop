const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWTSECRET;
const Product = require("../models/Product");
// const ObjectId = require("mongoose").Types.ObjectId;

const fetchProduct = async (req, res, next) => {
  const productID = req.params.id;
  if (!productID) {
    res.status(401).json({ error: "Product ID is required" });
  }
  try {
    let product = await Product.findById(productID);
    if (!product) {
      return res.status(401).json({ error: "No such product exists." });
    }
    const price = product.given_price.toString();
    req.product_obj = product;
    req.product_image = product.image;
    req.product_name = product.product_name;
    req.product_seller_id = product.seller;
    req.price = price;
    // req.product.seller = product.seller;
    req.product_seller = product.seller;
    next();
  } catch (e) {
    res.status(401).json({ error: e });
    console.log(e);
  }
};

module.exports = fetchProduct;
