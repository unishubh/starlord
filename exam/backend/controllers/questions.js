const uuid = require("uuid");
const validators = require("../utilities/validations/admin_authorize");
const utilities = require("../helpers/utilities");
const db = require("../models");
const updateResponse = require("../helpers/updateUserResponse");

module.exports.InsertQuestions = async (req, res) => {
  const { paperID } = req.params;
  const { options } = req.body; // Frontend will provide this is an array of options
  const { correctAns } = req.body;
  const { type } = req.body; // This will be always finite
  const { question } = req.body; // The question text
  const { posMark } = req.body; // int
  const { negMark } = req.body; // neg
  // check if the user has authority over the paper he is trying to insert into
  try {
    if (!validators.isAccessible("paperID", paperID, "")) {
      // todo:send agency id after taking it from jwt
      utilities.sendNotAllowed("Admin not allowed for this exam", res);
    }
    const questionData = {};
    questionData.type = type;
    questionData.options = options;
    questionData.correctAns = correctAns;
    questionData.question = question;
    questionData.posMark = posMark;
    questionData.negMark = negMark;
    // await db.sequelize.query("UPDATE questions set questions = JSON_ARRAY_APPEND(questions, '$' , '" +JSON.stringify(data)+"') where paperID = '"+paperID+"';" );
    const lasQuestion = await db.questions.findAll({
      limit: 1,
      where: {
        paperID,
      },
      order: [["createdAt", "DESC"]],
      raw: true,
    });
    let newIID;
    if (!lasQuestion.length) {
      newIID = 1;
    } else {
      newIID = lasQuestion[0].iid + 1;
    }
    const newData = db.questions.build({
      id: uuid.v4(),
      iid: newIID,
      paperID,
      qnJSON: questionData,
    });
    await newData.save();
    utilities.sendSuccess("success", res, newData);
  } catch (e) {
    console.log(e);
    utilities.sendError(e, res);
  }
};

module.exports.getQuestionByIntegerID = async (req, res) => {
  try {
    const { qnID } = req.body;
    const { paperID } = req.body;
    const qn = await db.questions.findOne({
      where: {
        paperID,
        iid: qnID,
      },
      raw: true,
    });
    console.log(qn);
    const qnToSend = {};
    qnToSend.question = qn.qnJSON.question;
    qnToSend.options = qn.qnJSON.options;
    qnToSend.posMark = qn.qnJSON.posMark;
    qnToSend.negMark = qn.qnJSON.negMark;
    if (!qn) throw "Question does not exist";
    const { userID } = req.user;
    const attempt = await db.attemptedPapers.findOne({
      include: {
        model: db.mockpapers,
        include: [db.exams],
      },
      where: {
        paperID,
        userID,
      },
      raw: true,
    });

    if (!attempt) {
      console.log(
        "No previous attempts found, hence this paper was not attempted, please user attemptPaper api"
      );
      utilities.sendError(
        "you need to attempt this paper before fetching the question",
        res
      );
    }
    const response = {};
    response.question = qnToSend;
    response.startTime = attempt.startTime;
    response.duration = attempt["mockpaper.exam.time"];
    response.userResponse = await updateResponse.ofUser(req, res);
    utilities.sendSuccess("success", res, response);
  } catch (err) {
    console.log(err);
    utilities.sendError(err, res);
  }
};

module.exports.getNumberOfQuestions = async (req, res) => {
  const { paperID } = req.params;
  try {
    const exam = await db.questions.findOne({
      where: { paperID },
      include: db.mockpapers,
      order: [["iid", "DESC"]],
      limit: 1,
    });
    const data = {};
    data.maxQuestions = exam.mockpaper.totalQns;
    data.currentQuestions = exam.iid;
    utilities.sendSuccess("success", res, data);
  } catch (e) {
    console.log(e);
    utilities.sendError(e, res);
  }
};
