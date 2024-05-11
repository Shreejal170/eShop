const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const fetchSeller = require("../middleware/fetchSeller");
const {
  createUser,
  createSeller,
  loginUser,
  loginSeller,
  getSellerDetails,
} = require("../controllers/authController");

// @route  POST /api/auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      console.log("Got a request", body);
      await createUser(req, res);
    } catch (error) {
      console.log("Something went wrong!! Target: auth_controller.js");
    }
  }
);
// @route   POST /api/auth
router.post(
  "/createseller",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("store", "Enter fullname").isLength({ min: 3 }),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      await createSeller(req, res);
    } catch (error) {
      console.log("Something went wrong!! Target: auth_controller.js");
    }
  }
);

//redirecting user's login req
router.post(
  "/loginuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").exists(),
  ],
  async (req, res) => {
    try {
      loginUser(req, res);
    } catch (e) {
      res.status(401).send(e);
    }
  }
);

//redirecting seller'g login req
router.post(
  "/loginseller",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").exists(),
  ],
  async (req, res) => {
    try {
      loginSeller(req, res);
    } catch (e) {
      res.status(401).send(e);
    }
  }
);

router.get("/getsellerdetails", fetchSeller, async (req, res) => {
  try {
    getSellerDetails(req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
