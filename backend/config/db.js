const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const URL = process.env.MongoURL;
const connection = mongoose.connect(
  "mongodb+srv://kushawahyogesh93:Yogesh@cluster0.j9tkecq.mongodb.net/RoxilerSystem?retryWrites=true&w=majority&appName=Cluster0"
);

module.exports = {
  connection,
};
