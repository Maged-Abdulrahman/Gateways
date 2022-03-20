const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://musala-soft:musala-soft123@cluster0.jvtym.mongodb.net/test").then(
  () => {
    console.log("DB connected");
  },
  (err) => {
    console.log(err);
  }
);