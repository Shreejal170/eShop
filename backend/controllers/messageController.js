//These are for implementing chat mechanism that can be integrated in future
const messageModel = require("../models/Message");

exports.addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  console.log(chatId);
  const message = new messageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    console.log(`Error occured in addMessage \n${error}`);
    res.status(401).json(error);
  }
};

exports.getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await messageModel.find({ chatId });
    res.status(200).json({ result });
  } catch (error) {
    console.log(`Error occured in getMessages \n${error}`);
    res.status(401).json(error);
  }
};
