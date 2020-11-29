const uuid = require("uuid");
const db = require("../models");
const utilities = require("../helpers/utilities");
const createJSON = require("../helpers/createJSONresponse");
const paperAttempted = require("../helpers/isAttempted");
const { calculateResult } = require("../helpers/api-utillities");

exports.createPaper = async (req, res) => {
  const newExamID = req.body.examID;
  const newName = req.body.name;
  const newTotalQns = req.body.totalQns;

  try {
    const exam = await db.exams.findOne({ where: { id: newExamID } });
    if (!exam) {
      console.log("Exam does not exist");
      utilities.sendError("Exam does not exist", res);
      return;
    }
    const newPaper = db.mockpapers.build({
      id: uuid.v1(),
      examID: newExamID,
      name: newName,
      totalQns: newTotalQns,
    });
    await newPaper.save();
    utilities.sendSuccess("success", res, newPaper);
  } catch (err) {
    console.log(`401 ${err}`);
    utilities.sendError(err, res);
  }
};

exports.getPaperByExam = async (req, res) => {
  try {
    const newExamID = req.params.examID;
    const { count, rows } = await db.mockpapers.findAndCountAll({
      where: {
        examID: newExamID,
      },
    });

    const exams = {};
    const { userID } = req.user;
    exams.attemptedPapers = await db.attemptedPapers.findAll({
      include: db.mockpapers,
      where: {
        userID,
      },
      raw: true,
    });
    exams.papercount = count;
    exams.paperdata = rows;
    res.status(200);
    res.send(exams);
  } catch (err) {
    console.log(`401 ${err}`);
    utilities.sendError(err, res);
  }
};

exports.attemptPaperbyPaperID = async (req, res) => {
  try {
    const startTime = new Date();
    const newUserID = req.user.userID;
    const newPaperID = req.params.paperID;
    const paperExist = await db.mockpapers.findOne({
      include: db.exams,
      where: {
        id: newPaperID,
      },
    });
    if (!paperExist) {
      console.log("MockPaper with this paper ID does not exist");
      utilities.sendError("MockPaper with this paper ID does not exist", res);
    }
    const attemptExpired = await paperAttempted.byUser(req, res);
    if (attemptExpired) {
      throw "User has already finished the paper";
    }
    const alreadyResponse = await db.userPaperResponse.findOne({
      where: {
        userID: newUserID,
        paperID: newPaperID,
      },
      raw: true,
    });
    if (!alreadyResponse) {
      const examineeResponse = await createJSON.ofQns(req, res);
      const newResponse = db.userPaperResponse.build({
        id: uuid.v4(),
        userID: newUserID,
        paperID: newPaperID,
        response: examineeResponse,
      });
      await newResponse.save();
    }
    const userResponse = await db.userPaperResponse.findOne({
      where: {
        userID: newUserID,
        paperID: newPaperID,
      },
      raw: true,
    });
    const startPaperResponse = {};
    const firstQuestion = await db.questions.findOne({
      where: {
        iid: 1,
        paperID: newPaperID,
      },
      raw: true,
    });
    if (!firstQuestion) throw "There are no questions in this paper";
    startPaperResponse.firstQuestion = firstQuestion;
    startPaperResponse.userPaperResponse = userResponse;

    const attempted = await db.attemptedPapers.findOne({
      where: {
        userID: newUserID,
        paperID: newPaperID,
      },
      raw: true,
    });

    startPaperResponse.startTime = attempted.startTime;
    startPaperResponse.duration = paperExist.exam.time;

    utilities.sendSuccess("success", res, startPaperResponse);
  } catch (err) {
    console.log(`401 ${err}`);
    utilities.sendError(err, res);
  }
};

exports.endExam = async (req, res) => {
  try {
    const { paperID } = req.params;
    const { userID } = req.user;
    const totalMarks = 0;
    await db.attemptedPapers.update(
      { finished: true },
      {
        where: {
          paperID,
          userID,
        },
      }
    );

    const evaluationObj = {};
    evaluationObj.userRespnse = await db.userPaperResponse.findOne({
      where: {
        paperID,
        userID,
      },
      attributes: ["response"],
      raw: true,
    });
    const qnData = await db.questions.findAll({
      where: { paperID },
      attributes: ["iid", "qnJSON"],
      raw: true,
    });
    const correctResponse = {};
    // eslint-disable-next-line no-undef,guard-for-in
    for (const qn in qnData) {
      correctResponse[qnData[qn].iid] = qnData[qn].qnJSON;
    }
    evaluationObj.correctResponse = correctResponse;
    evaluationObj.totalMarks = await calculateResult(
      evaluationObj.correctResponse,
      evaluationObj.userRespnse.response
    );

    utilities.sendSuccess("Exam Ended", res, evaluationObj);
  } catch (err) {
    utilities.sendError(`Error :${err}`, res);
  }
};

exports.showResults = async (req, res) => {
  try {
    const { paperID } = req.params;
    const { userID } = req.user;
    const compare = {};
    compare.userRespnse = await db.userPaperResponse.findOne({
      where: {
        paperID,
        userID,
      },
      attributes: ["response"],
      raw: true,
    });
    const qnData = await db.questions.findAll({
      where: { paperID },
      attributes: ["iid", "qnJSON"],
      raw: true,
    });
    const correctResponse = {};
    // eslint-disable-next-line no-undef,guard-for-in
    for (const qn in qnData) {
      correctResponse[qnData[qn].iid] = qnData[qn].qnJSON;
    }

    compare.correctResponse = correctResponse;

    compare.totalMarks = await calculateResult(
      compare.correctResponse,
      compare.userRespnse.response
    );

    utilities.sendSuccess("Got responses to compare ", res, compare);
  } catch (err) {
    console.log(err);
    utilities.sendError(err, res);
  }
};
