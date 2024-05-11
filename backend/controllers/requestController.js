const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWTSECRET;
const Request = require("../models/Request");
const Product = require("../models/Product");
const { validationResult } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createRequest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  try {
    const userID = req.userId;
    const newRequest = new Request({
      user: userID,
      product_name: req.body.product_name,
      category: req.body.category,
      price_range: req.body.price_range,
      description: req.body.description,
      image: req.body.image,
      state: "pending",
      product_id: "null",
    });
    await newRequest.save();
    res
      .status(200)
      .json({ message: "Request created successfully", newRequest });
  } catch (error) {
    res.status(401).send(error);
  }
};

exports.fetchRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    return res.status(201).json(requests);
  } catch (error) {
    return res.stats(401).json(error);
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    const productId = new ObjectId(req.body.product_id);
    const product_info = await Product.findById(productId);
    if (product_info) {
      const check_state = await Request.findById(req.params.id);
      if (check_state.state !== "pending") {
        return res.status(401).json({
          success: false,
          message: "Product was already accepted by other seller",
        });
      }
      const request = await Request.findByIdAndUpdate(
        req.params.id, // make sure to use 'params' instead of 'param'
        {
          state: "accepted",
          product_id: req.body.product_id,
        },
        {
          new: true, // this will return the updated document
        }
      );
      res.status(201).json({ success: true, request });
      // logs the updated document
    } else {
      return res.status(401).json({
        success: false,
        message: "Prodcut is missing in database. Try again later",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, error });
  }
};

exports.reviewRequest = async (req, res) => {
  try {
    const results = await Request.find({
      user: req.userId,
      state: "accepted",
      product_id: { $ne: null },
    });
    return res.status(201).json(results);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error });
  }
};
