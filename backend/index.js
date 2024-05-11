//mongodb://localhost:27017/
require("dotenv").config();
const express = require("express");
var cors = require("cors");
const connectToMongo = require("./db");
const app = express();

(async () => {
  try {
    await connectToMongo();
    console.log("**SUCCESSFULLY CONNECTED**");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
})();

const port = 5000;
app.get("/", (req, res) => {
  res.send("Hello Srizal");
});

app.use(cors());
app.use(express.json()); //middle ware to decode json file
app.use("/api/auth", require("./routes/auth"));
app.use("/api/shop", require("./routes/shop"));
app.use("/api/order", require("./routes/orderAPI"));
app.use("/api/request", require("./routes/request"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/image", express.static("photos"));
app.use("/api/message", require("./routes/messageRoute"));

app.listen(port, () => {
  console.log(`eShop!! listening on port ${port}`);
});
