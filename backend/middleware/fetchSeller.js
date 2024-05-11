const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWTSECRET;
const Seller = require("../models/Seller");

const getStoreName = async (seller_id) => {
  //write a querty to find seller id from seller and get seller's store
  let sellerInfo = await Seller.findById(seller_id);
  return sellerInfo ? sellerInfo.store : "Not Found";
};

const fetchSeller = async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ error: "Token is Invalid!!" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    if (data) {
      if (data.id) {
        req.seller = data.id;
      } else if (data.user) {
        req.seller = data.user;
      }
      req.store = await getStoreName(data.id);
    } else {
      return res.status(401).json({ error: "Your validation has failed" });
    }
    next();
  } catch (error) {
    console.log({ error });
    res.status(401).send({ error: "You hacker!?, Token is invalid" });
  }
};

module.exports = fetchSeller;
