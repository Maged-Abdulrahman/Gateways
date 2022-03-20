const MESSAGES = {
    numOfDevicesPerGatewayExceedsTen: "You cannot attach more than 10 devices to a gateway.",
    noGateways: "Sorry, there are currently no gateways. Add some to view them.",
    noGatewayWithSerialNumber: "Sorry, there's no gateway with this serial number. Please double check.",
    invalidIPAddress: "The provided IPv4 address is invalid. Please provide a valid one. Ex: 46.19.37.108",
    gatewayAlreadyExists: "A gateway with the same serial number already exists.",
    deviceDeletedSuccessfully: "Device deleted successfully.",
    gateWayAddedSuccessfully: "Gateway added successfully.",
    deviceaAddedSuccessfully: "Device was added to this gateway successfully.",
    deviceAlreadyExists: "This device is already added to a gateway",
    deviceDoesNotExist: "There's no device with this UID to be deleted"
}

module.exports = MESSAGES;