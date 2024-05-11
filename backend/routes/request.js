const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const {
  createRequest,
  fetchRequests,
  acceptRequest,
  reviewRequest,
} = require("../controllers/requestController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "photos/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/createrequest",
  fetchUser,
  [
    body("product_name", "Please enter a productname").notEmpty(),
    body("category", "Please enter category").notEmpty(),
    body("price_range", "Please enter price_range").notEmpty(),
    body("description", "Please enter a description").notEmpty(),
    body("image", "Please enter a image").notEmpty(),
  ],
  async (req, res) => {
    try {
      createRequest(req, res);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
);

router.post("/save-image", upload.single("image"), async (req, res) => {
  try {
    const filename = req.file.filename;
    res.status(200).json({
      filename: req.file.filename,
      url: `http://localhost:5000/api/image/${filename}`,
    });
  } catch (error) {
    res.status(401).json({ error });
  }
});

router.get("/fetchallrequests", async (req, res) => {
  try {
    fetchRequests(req, res);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/acceptrequest/:id", async (req, res) => {
  try {
    acceptRequest(req, res);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/reviewrequest", fetchUser, async (req, res) => {
  try {
    reviewRequest(req, res);
  } catch (error) {
    return res.status(401).send("Internal Server Error");
  }
});

module.exports = router;
