const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Order schema
const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" }, // User who placed the order
  productId: { type: Schema.Types.ObjectId, ref: "Product" }, // Product that was ordered
  productName: { type: String, required: true }, // Product name or SKU
  quantity: { type: Number, required: true }, // Quantity of this product in the order
  price: { type: Number, required: true }, // Price per item (in cents)
  totalPrice: { type: Number, required: true },
  image: { type: String, required: true },
  deliveryDate: { type: Date, require: true }, // The date that the product should be delivered by
  placedDate: { type: Date, default: Date.now }, //  When was this order placed?
});

const Order = mongoose.model("Orders", orderSchema);
module.exports = Order;
