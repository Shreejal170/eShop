// const fetchSeller = require("../middleware/fetchSeller
const { validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWTSECRET;
const Order = require("../models/Order");
const ObjectId = require("mongoose").Types.ObjectId;

const getDeliveryDate = () => {
  const today = new Date();
  const threeDaysAhead = new Date();
  threeDaysAhead.setDate(today.getDate() + 3);
  return threeDaysAhead; // Output: 2024/03/07 (assuming today is 2024/03/04)
};

const getTotalPrice = (quantity, price) => {
  let quan = quantity;
  let decPrice = parseFloat(price).toFixed(2);
  return quan * decPrice;
};

const extractOrder = async (orders) => {
  const orderDetails = orders.map(
    ({ image, productName, price, quantity, totalPrice }) => ({
      image,
      productName,
      price,
      quantity,
      totalPrice,
    })
  );
  const total = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  return { orderDetails, total };
};

exports.placeOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userID = req.userId;
    const productId = new ObjectId(req.params.id);
    const orderData = getDeliveryDate();
    const newOrder = new Order({
      user: userID,
      productId: productId,
      productName: req.product_name,
      quantity: req.body.quantity,
      price: req.price,
      image: req.product_image,
      totalPrice: getTotalPrice(req.body.quantity, req.price),
      deliveryDate: orderData,
    });
    await newOrder.save();
    res.status(201).send(newOrder);
  } catch (e) {
    res.status(401).json({ success: false, e });
    console.log({ e });
  }
};

exports.removeOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(401).json({ error: "Order was not found" });
    }
    if (order.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this order" });
    }
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    res.status(201).json({ action: "delete", success: true, deletedOrder });
  } catch (e) {
    res.status(401).json({ error: e });
  }
};

exports.editOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(401).json({ error: "Order was not found" });
    }
    if (order.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this order" });
    }
    order.quantity = parseInt(req.body.quantity);
    order.totalPrice = getTotalPrice(req.body.quantity, order.price);
    let edited_order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: order },
      { new: true }
    );
    res.status(201).json({ action: "edit", success: true, edited_order });
  } catch (e) {
    res.status(401).json({ error: e });
    console.log(e);
  }
};

exports.fetchOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.userId,
    });
    return res.status(201).json(orders);
  } catch (error) {
    return res.status(401).json({ success: false, error });
  }
};

exports.checkOutOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.userId,
    });
    const result = await extractOrder(orders);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(401).json(error);
  }
};
