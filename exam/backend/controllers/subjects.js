const Sequelize = require("sequelize");
const { adderUtil } = require("../helpers/api-utillities");
const db = require("../models");
const utilities = require("../helpers/utilities");

const { Op } = Sequelize;

exports.addSubject = async (req, res) => {
  const { name } = req.body;

  try {
    const sub = await adderUtil(name, db.subjects);
    utilities.sendSuccess("success", res, sub);
  } catch (e) {
    console.log(e);
    utilities.sendError(e, res);
  }
};

module.exports.getSubjects = async (req, res) => {
  const { query } = req.params;

  try {
    const sub = await db.subjects.findAll({
      where: {
        name: {
          [Op.like]: `${query}%`,
        },
      },
    });
    utilities.sendSuccess("success", res, sub);
  } catch (e) {
    console.log(e);
    utilities.sendError(e, res);
  }
};

module.exports.verifySubject = async (req, res) => {
  const { subjectID } = req.params;
  try {
    const status = await db.subjects.update(
      {
        isVerified: true,
      },
      {
        where: {
          id: subjectID,
        },
      }
    );
    utilities.sendSuccess("success", res, status);
  } catch (e) {
    console.log(e);
    utilities.sendError(e, res);
  }
};
