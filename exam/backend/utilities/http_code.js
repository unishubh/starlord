const utils = require("util");

module.exports.send_blank_message = (data, res) => {
  res.status(200);
  res.send({ message: utils.format(errors.blank_variable, data.attribute) });
};

module.exports.send_invalid_message = (data, res) => {
  res.status(200);
  res.send({ message: utils.format(errors.invalid_variable, data.attribute) });
};

module.exports.sendError = (message = "Some error Occured", res) => {
  res.status(501);
  res.send({ message });
};

module.exports.sendSuccess = (message, res) => {
  res.status(200);
  res.send({ message });
};

module.exports.sendNotAllowed = (data, res) => {
  res.status(405);
  res.send({ message: data });
};
