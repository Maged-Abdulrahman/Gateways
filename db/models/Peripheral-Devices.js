const mongoose = require("mongoose");

const deviceModel = new mongoose.Schema({
  UID: { type: Number, unique: true },
  vendor: { type: String },
  dateCreated: { type: Date },
  status: { type: String },
  gateway: {type: mongoose.Schema.Types.ObjectId, ref: "gatewayModel"}
});

module.exports = mongoose.model("peripheral-devices", deviceModel);
