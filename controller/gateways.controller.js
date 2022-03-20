var validateIP = require("validate-ip-node");

const Gateway = require("../db/models/Gateway");
const PeripheralDevices = require("../db/models/Peripheral-Devices");
const MESSAGES = require("../utils/response-messages");
const {
  createdSuccessfully,
  notAcceptable,
  normalResponse,
} = require("../utils/responseHandling");

/////////////// OPERATIONS ///////////////

const getAllGateways = async (req, res) => {
  try {
    let allGateways = [];
    let gateways = await Gateway.find();
    if (gateways.length === 0) {
      notAcceptable(res, MESSAGES.noGateways);
    } else {
      gateways.forEach(async (gateway, index) => {
        const gatewayDevices = await PeripheralDevices.find({
          gateway: gateway._id,
        });
        allGateways.push({ ...gateway._doc, devices: gatewayDevices });

        if (index === gateways.length - 1) normalResponse(res, allGateways);
      });
    }
  } catch (error) {
    notAcceptable(res, error);
  }
};

const getGatewayBySerialNumber = async (req, res) => {
  try {
    const { serialNumber } = req.params;
    const gateway = await Gateway.findOne({ serialNumber });
    if (!gateway) {
      notAcceptable(res, MESSAGES.noGatewayWithSerialNumber);
    } else {
      const gatewayDevices = await PeripheralDevices.find({
        gateway: gateway._id,
      });
      normalResponse(res, { ...gateway._doc, devices: gatewayDevices });
    }
  } catch (error) {
    notAcceptable(res, error);
  }
};

const createGateway = async (req, res) => {
  const { serialNumber, name, IPv4Address, devices } = req.body;

  if (!validateIP(IPv4Address)) {
    notAcceptable(res, MESSAGES.invalidIPAddress);
    return;
  }

  try {
    const gateway = await new Gateway({ serialNumber, name, IPv4Address });
    const createdGateway = await gateway.save();
    if (devices && devices.length) {
      await attachDevicesToGateway(
        devices,
        createdGateway._id,
        MESSAGES.gateWayAddedSuccessfully,
        res
      );
    } else {
      createdSuccessfully(res, MESSAGES.gateWayAddedSuccessfully);
    }
  } catch (error) {
    if (error.code === 11000) {
      // duplicate entry
      notAcceptable(res, MESSAGES.gatewayAlreadyExists);
    } else {
      notAcceptable(res, error);
    }
  }
};

const addDeviceToGateway = async (req, res) => {
  try {
    const { gatewaySerialNumber, device } = req.body;
    const gateway = await Gateway.findOne({
      serialNumber: gatewaySerialNumber,
    });
    if (!gateway) {
      notAcceptable(res, MESSAGES.noGatewayWithSerialNumber);
    } else {
      await attachDevicesToGateway(
        [device],
        gateway._id,
        MESSAGES.deviceaAddedSuccessfully,
        res
      );
    }
  } catch (error) {
    notAcceptable(res, error);
  }
};

const removeDevice = async (req, res) => {
  try {
    const { UID } = req.params;
    const device = await PeripheralDevices.findOne({UID: UID});
    if (device) {
      await PeripheralDevices.deleteOne({ UID });
      normalResponse(res, MESSAGES.deviceDeletedSuccessfully);
    } else {
      notAcceptable(res, MESSAGES.deviceDoesNotExist);
    }
  } catch (error) {
    notAcceptable(res, error);
  }
};

//////////////// HELPER FUNCTIONS //////////////////

async function attachDevicesToGateway(
  devicesToBeAttached,
  gatewayId,
  successMessage,
  result
) {
  const currentGatewayDevices = await PeripheralDevices.find({
    gateway: gatewayId,
  });
  const canAddDevices =
    devicesToBeAttached.length + currentGatewayDevices.length <= 10;
  if (canAddDevices) {
    await devicesToBeAttached.forEach(async (element, index) => {
      try {
        const device = {
          UID: element.UID,
          vendor: element.vendor,
          status: element.status,
          dateCreated: new Date(),
          gateway: gatewayId,
        };
        const deviceToBeCreated = await new PeripheralDevices(device);
        await deviceToBeCreated.save();
        if (index === devicesToBeAttached.length - 1)
          createdSuccessfully(result, successMessage);
      } catch (error) {
        if (error.code === 11000) { // duplicate entry
          notAcceptable(result, MESSAGES.deviceAlreadyExists);
        } else {
          notAcceptable(result, error);
        }
      }
    });
  } else {
    notAcceptable(result, MESSAGES.numOfDevicesPerGatewayExceedsTen);
  }
}

module.exports = {
  createGateway,
  getAllGateways,
  getGatewayBySerialNumber,
  removeDevice,
  addDeviceToGateway,
};
