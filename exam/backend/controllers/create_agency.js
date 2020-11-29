const uuid = require("uuid");
const db = require("../models");
const utilities = require("../helpers/utilities");

module.exports.createAgency = async (req, res) => {
  const { name } = req.params;
  const data = db.agency.build({ id: uuid.v1(), name });
  try {
    await data.save();
    utilities.sendSuccess("success", res, data);
  } catch (e) {
    console.log(e);
    utilities.sendError(e, res);
  }
};
