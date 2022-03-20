const express =require ("express")
const gatewaysRoutes = express.Router();
const { createGateway, getAllGateways, getGatewayBySerialNumber, removeDevice, addDeviceToGateway } = require('../controller/gateways.controller');

gatewaysRoutes.get("/", getAllGateways);
gatewaysRoutes.get("/:serialNumber", getGatewayBySerialNumber);
gatewaysRoutes.post("/addGateway", createGateway);
gatewaysRoutes.post('/addDeviceToGateway', addDeviceToGateway);
gatewaysRoutes.delete('/removeDevice/:UID', removeDevice);


module.exports = gatewaysRoutes;