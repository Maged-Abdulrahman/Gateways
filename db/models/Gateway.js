const mongoose = require("mongoose");

const gatewayModel = new mongoose.Schema({
  serialNumber: { type: String, unique: true },
  name: { type: String },
  IPv4Address: { type: String }
});

module.exports = mongoose.model("gateways", gatewayModel);
