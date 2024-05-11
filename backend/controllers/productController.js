const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWTSECRET;
const Product = require("../models/Product");
const { validationResult } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

const discount_rate_calc = async (given, actual) => {
  //returns the discount percentage rate by rounding of to closet value
  return Math.round((actual - given) / (actual / 100));
};

exports.addProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  try {
    const dr = await discount_rate_calc(
      req.body.given_price,
      req.body.actual_price
    );
    const newProduct = new Product({
      seller: req.seller,
      store: req.store,
      product_name: req.body.name,
      actual_price: req.body.actual_price,
      given_price: req.body.given_price,
      discount_rate: dr,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      specifications: req.body.specifications,
    });
    newProduct.save().then(() => {
      return res.status(200).json({
        ...newProduct.toJSON(),
        date: new Date(),
        message: "Product Added Successfully",
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.editProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  if (req.seller !== req.product_seller.toString()) {
    return res.status(401).json({ errors: "You are not authorized" });
  }
  try {
    const product = req.product_obj;
    product.product_name = req.body.name;
    product.description = req.body.description;

    let edited_product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: product },
      { new: true }
    );

    res.status(201).json({ action: "edit", success: true, edited_product });
  } catch (e) {
    console.log(e);
  }
};

exports.deleteProdcut = async (req, res) => {
  if (req.seller != req.product_seller_id) {
    return res.status(401).json({ error: "You are not authorized" });
  }
  try {
    let product = req.product_obj;
    if (!product) {
      return res.status(401).json({ error: "This product does not exist." });
    }
    const deleted_product = await Product.findByIdAndDelete(req.params.id);
    res.status(201).json({ action: "delete", success: true, deleted_product });
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: e });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(201).json(products);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(201).json(product);
  } catch (error) {
    return res
      .status(401)
      .json({ message: `Product with this id ${req.params.id} is invalid` });
  }
};

exports.fetchSellerProducts = async (req, res) => {
  try {
    const sellerId = new ObjectId(req.seller);
    const products = await Product.find({
      seller: sellerId,
    });
    return res.status(201).json(products);
  } catch (e) {
    console.log(e);
    return res.status(401).json({ error: "Something went wrong", e });
  }
};
