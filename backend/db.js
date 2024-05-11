const mongoose = require("mongoose");

connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log("Connected to MongoDB-From server side");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // exit the process with a non-zero exit code
  }
};

module.exports = connectToMongo;
