const fetchProduct = require("../middleware/fetchProduct");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const {
  placeOrder,
  removeOrder,
  editOrder,
  fetchOrders,
  checkOutOrders,
} = require("../controllers/orderController");

// const calculatePrice = () => {
//   pass;
// };

router.post(
  //.....
  "/placeorder/:id",
  fetchUser,
  fetchProduct,
  [body("quantity", "Please enter the valid quantity").exists()],
  async (req, res) => {
    try {
      placeOrder(req, res);
    } catch (e) {
      console.log("Error encountered");
      console.log(e);
      res.status(401).json({ error: e });
    }
  }
);

router.delete("/removeorder/:id", fetchUser, async (req, res) => {
  //...
  try {
    removeOrder(req, res);
  } catch (e) {
    console.log("Error encountered");
    console.log(e);
    res.status(401).json({ error: e });
  }
});

router.put(
  //....
  "/editorder/:id",
  fetchUser,
  [
    body("quantity", "Please enter the valid quantity").custom((value) => {
      if (isNaN(value)) return false;
      if (parseInt(value) < 1) return false;
      else {
        return true;
      }
    }),
  ],
  async (req, res) => {
    try {
      editOrder(req, res);
    } catch (e) {
      res.status(401).json({ error: e });
      console.log(e);
    }
  }
);

router.get("/fetchorders", fetchUser, async (req, res) => {
  try {
    fetchOrders(req, res);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/checkoutorders", fetchUser, async (req, res) => {
  try {
    checkOutOrders(req, res);
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: e });
  }
});

module.exports = router;
