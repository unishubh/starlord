const sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const db = require("../models");
const utilities = require("./utilities");
const getJwtCred = require("./get_jwt_credentials");
const createJSON = require("./createJSONresponse");

module.exports.ofExam = async (req, res) => {
  try {
    const { paperID } = req.params;
    const paper = await db.mockpapers.findOne({
      where: {
        id: paperID,
      },
    });
    if (!paper) throw "Paper with this paper ID does not exist";
    const { examID } = paper;
    const exam = await db.exams.findOne({
      where: {
        id: examID,
      },
      raw: true,
    });
    if (!exam) throw "This exam does not exist";
    return exam.time;
  } catch (err) {
    console.log(err);
    utilities.sendError(err, res);
  }
};
