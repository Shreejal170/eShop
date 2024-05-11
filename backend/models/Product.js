const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller",
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  store: {
    type: String,
    required: true,
  },
  actual_price: {
    type: Number,
    required: true,
  },
  given_price: {
    type: Number,
    required: true,
  },
  discount_rate: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  discount_rate: {
    type: Number,
    required: true,
  },
  specifications: {
    type: Array,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Products", ProductSchema);
module.exports = Product;
