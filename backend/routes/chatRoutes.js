//These are for implementing chat mechanism that can be integrated in future
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  createChat,
  findChat,
  userChats,
} = require("../controllers/chatController");

router.post("/", async (req, res) => {
  createChat(req, res);
});

router.get("/:userId", async (req, res) => {
  userChats(req, res);
});

router.get("/find/:firstId/:secondId", async (req, res) => {
  console.log("Recieved a request");
  findChat(req, res);
});

module.exports = router;
