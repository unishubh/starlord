const sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const db = require("../models");

async function authenticate({ username, password }) {
  const user = await db.user.findOne({ where: { email } });

  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
