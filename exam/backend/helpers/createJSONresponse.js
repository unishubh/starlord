const sequelize = require("sequelize");
const db = require("../models");

exports.ofQns = async (req, res) => {
  try {
    const newPaperID = req.params.paperID;
    const qns = await db.questions.findAll({
      where: {
        paperID: newPaperID,
      },
      attributes: ["iid"],
      raw: true,
    });
    const examineeResponse = {};
    for (id in qns) {
      examineeResponse[qns[id].iid] = "";
    }
    return examineeResponse;
  } catch (err) {
    console.log(`401 ${err}`);
    utilities.sendError(err, res);
  }
};
