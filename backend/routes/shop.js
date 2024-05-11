const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  addProduct,
  editProduct,
  deleteProdcut,
  getAllProducts,
  getProductDetails,
  fetchSellerProducts,
} = require("../controllers/productController");
const fetchSeller = require("../middleware/fetchSeller");
const fetchProduct = require("../middleware/fetchProduct");

const validatePrice = (value) => {
  const floatNumberRegex = /^-?\d*(\.\d+)?$/;
  if (Number.isInteger(value) || floatNumberRegex.test(value)) {
    return true;
  } else {
    throw new Error("Please enter a valid number");
  }
};

function isValidJsonObject(obj) {
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
    return false;
  }

  // Check if the object has exactly one property
  const keys = Object.keys(obj);
  if (keys.length !== 1) {
    return false;
  }

  // Check if the value of the property is a string
  const value = obj[keys[0]];
  if (typeof value !== "string") {
    return false;
  }

  return true;
}

router.post(
  "/addproduct",
  fetchSeller, // middleware that gets the seller from the token and attaches it to req.seller
  [
    body("name", "Please use the proper name").isLength({ min: 1 }),
    body("actual_price", "Please enter the proper price").custom((value) => {
      return validatePrice(value);
    }),
    body("given_price", "Please enter the proper price").custom((value) => {
      return validatePrice(value);
    }),
    body("category", "Please provide a valid category").isLength({ min: 3 }),
    body("description", "Description must be at least 10 characters").isLength({
      min: 10,
    }),
    body("image", "image is invalid").notEmpty(),
    body("specifications", "Please enter value with proper tag")
      .isArray()
      .custom((value) => {
        if (Array.isArray(value)) {
          return value.every(isValidJsonObject);
        } else {
          throw new Error("Please enter an array of objects");
        }
      }),
  ],
  async (req, res) => {
    try {
      addProduct(req, res);
    } catch (e) {
      res.status(401).json({ error: e });
      console.log({ error: e });
    }
  }
);

router.put(
  "/editproduct/:id", //not allowed
  fetchSeller,
  fetchProduct,
  [
    body("name", "Enter a name with valid length").isLength({ min: 3 }),
    body("description", "Enter with valid key and vlaue").isLength({
      min: 10,
    }),
  ],
  async (req, res) => {
    try {
      editProduct(req, res);
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: e });
    }
  }
);

router.delete(
  //....
  "/deleteproduct/:id",
  fetchSeller,
  fetchProduct,
  async (req, res) => {
    try {
      deleteProdcut(req, res);
    } catch (e) {
      res.status(401).json({ e });
    }
  }
);

router.get("/fetchproducts", async (req, res) => {
  try {
    getAllProducts(req, res);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/getdetails/:id", async (req, res) => {
  try {
    console.log("Got called details");
    getProductDetails(req, res);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/getsellerproducts", fetchSeller, async (req, res) => {
  //...
  try {
    fetchSellerProducts(req, res);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
