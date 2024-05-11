const User = require("../models/User");
const Seller = require("../models/Seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWTSECRET;
const { validationResult } = require("express-validator");

//Create a user api
exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const secPass = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    newUser
      .save()
      .then((user) => {
        const data = {
          user: newUser.id,
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        let success = true;
        res.json({ success, authToken });
      })
      .catch((err) => {
        console.log(err.message);
        res.json({
          error: "Please enter unqiue value",
          Error: "True",
          message: err.message,
        });
      });
  } catch (err) {
    res.status(500).send("Server Error || Please check your code");
    console.log(err.message);
  }
};

//Create a seller api
exports.createSeller = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const secPass = bcrypt.hashSync(req.body.password, salt);
    let newSeller = new Seller({
      name: req.body.name,
      email: req.body.email,
      store: req.body.store,
      password: secPass,
      image: req.body.image,
    });
    newSeller
      .save()
      .then((user) => {
        const data = {
          user: newSeller.id,
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        let success = true;
        console.log(newSeller);
        res.json({ success, authToken });
      })
      .catch((err) => {
        console.log("Error no.1: ", err.message);
        res.status(401).json({
          error: "Please enter unqiue value",
          Error: "True",
          message: err.message,
        });
      });
  } catch (e) {
    res.status(500).send("Server Error || Please check your code");
    console.log("Error no.1: ", err.message);
  }
};

//Create a login api for normal users:
exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array });
  }
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }); //gets the user's data through email

    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    //(req.body.password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    // Create token
    const data = {
      id: user._id,
    };
    const token = jwt.sign(data, JWT_SECRET);
    // Return jsonwebtoken to the client side
    res.status(201).json({ success: true, token });
  } catch (e) {
    res.status(500).send("Internal Server Error");
    console.log({ error: e });
  }
};

//login verify for seller
exports.loginSeller = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    let seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const validPassword = await bcrypt.compare(password, seller.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid Crednetials!" });
    }
    //Create token
    const data = {
      id: seller._id,
    };
    const token = jwt.sign(data, JWT_SECRET);
    res.status(201).json({ success: true, token });
  } catch (e) {
    // console.log({ Function: "loginSeller", e
    return res.stat(500).send("Internal Server error");
  }
};

exports.getSellerDetails = async (req, res) => {
  console.log("Into the main function");
  try {
    console.log(req.seller);
    const seller = await Seller.findById(req.seller).select("-password -email");
    return res.status(200).json({ success: true, seller });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
};
