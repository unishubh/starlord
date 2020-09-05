const sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const db = require("../models");
const utilities = require("./utilities");
const getJwtCred = require("./get_jwt_credentials");
const createJSON = require("./createJSONresponse");

module.exports.ofUser = async (req, res) => {
  try {
    const { lastQnID } = req.body;
    const lastAns = req.body.lastQnAns;
    const { paperID } = req.body;
    const userID = await getJwtCred.userID(req, res);
    const userResponse = await db.userPaperResponse.findOne({
      where: {
        paperID,
        userID,
      },
      raw: true,
    });
    if (!userResponse) throw "Did not attempt yet";
    // userResponse[userResponse][lastQnID] = lastAns ;
    console.log(userResponse);
    userResponse.response[lastQnID] = lastAns;
    await db.userPaperResponse.update(
      { response: userResponse.response },
      {
        where: {
          paperID,
          userID,
        },
      }
    );
    let sendBackResponse = new Object();
    sendBackResponse = userResponse.response;
    return sendBackResponse;
  } catch (err) {
    console.log(err);
    utilities.sendError(err, res);
  }
};
