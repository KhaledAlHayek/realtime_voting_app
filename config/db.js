const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const connectDB = () => {
  mongoose.connect("mongodb+srv://khaled:khaled123@ospoll.qm6pmhe.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
      console.log("Mongodb Connected.");
    })
    .catch(err => console.log(err));
}

module.exports = connectDB;