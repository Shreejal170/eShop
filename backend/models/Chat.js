//These are for implementing chat mechanism that can be integrated in future
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChatSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model("Chat", ChatSchema);
module.exports = chatModel;
