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

module.exports.calculateResult = async (correctResponses, userResponses) => {
  let finalMarks = 0;
  for (const key in correctResponses) {
    const value = correctResponses[key];
    // if ({}.hasOwnProperty.call(correctResponses[key], value)) {
    if (userResponses[key] === value.correctAns) {
      finalMarks += parseInt(value.posMark, 10);
    } else if (userResponses[key] !== "") {
      finalMarks -= parseInt(value.negMark, 10);
    }
  }
  // }
  return finalMarks;
};
