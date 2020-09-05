module.exports.register = (req, res) => {
  const regex_paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,25}$/;
  const user_password = req.body.password;
  if (regex_paswd.test(user_password))
    console.log("Password is of correct format");
  else {
    res.status(400);
    res.send({
      message: " Wrong password format ",
    });
  }
};
