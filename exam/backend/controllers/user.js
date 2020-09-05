const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const db = require("../models");
const passwordHelper = require("../helpers/password");
const utilities = require("../helpers/utilities");
const getJwtCred = require("../helpers/get_jwt_credentials");

module.exports.addUser = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { email } = req.body;
    const { role } = req.body;
    const { password } = req.body;
    const userID = uuid.v4();
    const hashed_password = await passwordHelper.hash_password(password);
    const { agencyID } = req.body;
    await passwordHelper.validate_fields(req);
    const newUser = db.user.build({
      name,
      email,
      password: hashed_password,
      role,
      id: userID,
      agencyID,
    });
    await newUser.save();
    const accessToken = jwt.sign(
      {
        userID: newUser.id,
        role: newUser.role,
        agencyID: newUser.agencyID,
        userName: newUser.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const data = {
      data: newUser,
      accessToken,
    };

    utilities.sendSuccess("success", res, data);
  } catch (err) {
    console.log(`401 ${err}`);
    // next can redirect to home page
    utilities.sendError(err, res);
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { password } = req.body;

    const user = await db.user.findOne({ where: { email } });
    if (!user) {
      console.log("User does not exist");
      utilities.sendNotAllowed("invalid user", res);
      return;
    }
    const match_password = await passwordHelper.validate_password(
      password,
      user.dataValues.password
    );
    if (!match_password) {
      console.log("invalid password");
      utilities.sendNotAllowed("invalid password", res);
      return;
    }
    const accessToken = jwt.sign(
      {
        userID: user.id,
        role: user.role,
        agencyID: user.agencyID,
        userName: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );
    utilities.sendSuccess("success", res, accessToken);
  } catch (err) {
    console.log(err);
    utilities.sendError(err, res);
    next(err);
  }
};
