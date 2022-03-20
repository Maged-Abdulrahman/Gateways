module.exports = {
    normalResponse: (res, data) => {
        res.status(200).json({statusCode: 200, data});
    },
    createdSuccessfully: (res, data) => {
        res.status(201).json({statusCode: 201, data});
    },
    notAcceptable: (res, msg) => {
        res.status(406).json({statusCode: 406, error: msg});
    }
}