const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWTSECRET;
const User = require("../models/User");
const fetchUser = async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    res.status(401).send({ error: "You hacker!?, Token is invalid" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    if (!data) {
      res.status(401).send("Token is invalid");
    }
    req.userId = data.id;
    const userInfo = await User.findById(req.userId);
    if (!userInfo) return res.status(400).send("No such user!");
    next();
  } catch (error) {
    console.log({ error });
    res.status(401).send({ error: "You hacker!?, Token is invalid" });
  }
};

module.exports = fetchUser;
