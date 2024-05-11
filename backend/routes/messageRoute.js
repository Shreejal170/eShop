//These are for implementing chat mechanism that can be integrated in future
const express = require("express");
const router = express.Router();
const { addMessage, getMessages } = require("../controllers/messageController");

router.post("/", async (req, res) => {
  addMessage(req, res);
});
router.get("/:chatId", async (req, res) => {
  getMessages(req, res);
});

module.exports = router;
