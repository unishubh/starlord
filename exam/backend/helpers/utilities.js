const utils = require('util');

module.exports.sendError = (message="Some error Occurred", res) => {
    res.status(501);
    res.send({ "message": message });
}

module.exports.sendSuccess = (message, res, data = {}) => {
    res.status(200);
    res.send({ "message": message, data });
}

// module.exports.send_blank_message = (data, res) => {
//     res.status(200);
//     res.send({ 'message': helpers.format(errors.blank_variable, data.attribute) });
// }

module.exports.sendNotAllowed = (data, res) => {
    sendMessage(data, res, 405);
}
let sendMessage = module.exports.sendMessage = (data, res, code) => {
    res.status(code);
    res.send({message:data});
}
// module.exports.send_invalid_message = (data, res) => {
//     res.status(200);
//     res.send({ 'message': helpers.format(errors.invalid_variable, data.attribute) });
// }