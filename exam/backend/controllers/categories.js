const Sequelize = require("sequelize");
const { adderUtil } = require("../helpers/api-utillities");
const db = require("../models");
const utilities = require("../helpers/utilities");

const { Op } = Sequelize;

exports.addCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const sub = await adderUtil(name, db.categories);
    utilities.sendSuccess("success", res, sub);
  } catch (e) {
    console.log(e);
    utilities.sendError(e, res);
  }
};

module.exports.getCategories = async (req, res) => {
  const { query } = req.params;

  try {
    const sub = await db.categories.findAll({
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

module.exports.verifyCategory = async (req, res) => {
  const { categoryID } = req.params;
  try {
    const status = await db.categories.update(
      {
        isVerified: true,
      },
      {
        where: {
          id: categoryID,
        },
      }
    );
    utilities.sendSuccess("success", res, status);
  } catch (e) {
    console.log(e);
    utilities.sendError(e, res);
  }
};
