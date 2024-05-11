//These are for implementing chat mechanism that can be integrated in future
const chatModel = require("../models/Chat");

exports.createChat = async (req, res) => {
  const newChat = new chatModel({
    members: [req.body.senderId, req.body.recieverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    console.log("Error at createChat()\n", error);
    return res.status(500).send("Internal server error");
  }
};

exports.userChats = async (req, res) => {
  try {
    const chat = await chatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log("Error at userChats()\n", error);
    return res.status(500).send("Internal server error");
  }
};

exports.findChat = async (req, res) => {
  try {
    const chat = await chatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log("Error at finChat()\n", error);
    return res.status(500).send("Internal server error");
  }
};
