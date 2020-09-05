const db = require("../../models");

module.exports.register = async (req, res) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const { email } = req.body;
  if (!re.test(email) || email == "") {
    res.status(400);
    res.send({
      message: "Wrong email id ",
    });
  }
  const found_entry = await db.email_mapping.findByPk(email);
  console.log(`Found entry _______${found_entry}`);
  if (found_entry) {
    res.status(400);
    res.send({
      message: " User with this Email id exists ",
    });
  } else console.log("Email id can be used to create account");
};
