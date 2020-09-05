const uuid = require("uuid");

module.exports.adderUtil = async (name, type) => {
  try {
    const sub = type.build({ id: uuid.v1(), name, isVerified: false });
    await sub.save();
    return sub;
  } catch (e) {
    console.log(e);
    return e;
  }
};
