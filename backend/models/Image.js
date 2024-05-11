const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;
