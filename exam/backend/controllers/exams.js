const uuid = require("uuid");
const Sequelize = require("sequelize");
const db = require("../models");

const { Op } = Sequelize;
const utilities = require("../helpers/utilities");
const { adderUtil } = require("../helpers/api-utillities");
const paperAttempted = require("../helpers/isAttempted");

exports.getAllExams = async (req, res) => {
  const { subjectID } = req.body;
  const { categoryID } = req.body;
  try {
    const condition = {};
    if (subjectID) {
      condition[Op.and] = { subjectID };
    }
    if (categoryID) {
      condition[Op.and] = { categoryID };
    }
    const { count, rows } = await db.exams.findAndCountAll({
      where: condition,
    });
    const subscribedExams = await db.subscriptions.findAndCountAll(condition);
    const exams = {};
    exams.examcount = count;
    exams.examdata = rows;
    exams.subscribedExams = subscribedExams;
    res.status(200);
    res.send(exams);
  } catch (err) {
    console.log(`401 ${err}`);
    utilities.sendError(err, res);
  }
};

exports.createExam = async (req, res) => {
  const newAgencyID = req.user.agencyID;
  const newName = req.body.name;
  const newDetails = req.body.details;
  const newMaxMarks = req.body.maxMarks;
  const newTime = req.body.time;
  const { passingMarks } = req.body;
  const { subject } = req.body;
  const { category } = req.body;
  console.log(newAgencyID);
  try {
    let categoryID = category.value;
    let subjectID = subject.value;
    // eslint-disable-next-line no-underscore-dangle
    if (category.__isNew__) {
      const cat = await adderUtil(category.label, db.categories);
      categoryID = cat.id;
    }

    // eslint-disable-next-line no-underscore-dangle
    if (subject.__isNew__) {
      const sub = await adderUtil(subject.label, db.subjects);
      subjectID = sub.id;
    }
    const agency = await db.agency.findOne({ where: { id: newAgencyID } });
    if (!agency) {
      console.log("Agency does not exist");
      utilities.sendError("Agency does not exist", res);
      return;
    }
    const newExam = db.exams.build({
      id: uuid.v1(),
      agencyID: newAgencyID,
      name: newName,
      details: newDetails,
      max_marks: newMaxMarks,
      passingMarks,
      time: newTime,
      subjectID,
      categoryID,
    });
    console.log(newExam);
    await newExam.save();
    utilities.sendSuccess("success", res, newExam);
  } catch (err) {
    console.log(`401 ${err}`);
    utilities.sendError(err, res);
  }
};

exports.getExamsByAgencyID = async (req, res) => {
  try {
    const newAgencyID = req.user.agencyID;
    const { count, rows } = await db.exams.findAndCountAll({
      where: {
        agencyID: newAgencyID,
      },
      attributes: ["id", "name"],
    });
    console.log(count);
    const exams = {};
    exams.examcount = count;
    exams.examdata = rows;
    utilities.sendSuccess("success", res, exams);
  } catch (err) {
    console.log(`401 ${err}`);
    utilities.sendError(err, res);
  }
};

exports.getExamByID = async (req, res) => {
  try {
    const { examID } = req.params;
    const exam = await db.exams.findOne({ where: { id: examID } });
    if (!exam) {
      utilities.sendError("Exam does not exist", res);
      return;
    }
    utilities.sendSuccess("success", res, exam);
  } catch (err) {
    console.log(`401 ${err}`);
    utilities.sendError(err, res);
  }
};

exports.getExamByUserID = async (req, res) => {
  const { userID } = req.user;
  try {
    const { count, rows } = await db.subscriptions.findAndCountAll({
      include: db.exams,
      where: { userID },
    });

    if (!count) {
      console.log("No Subscribed exams exist");
      utilities.sendError("No Subscribed exams exist", res);
      return;
    }
    utilities.sendSuccess("success", res, rows);
  } catch (err) {
    console.log(`401 ${err}`);
    utilities.sendError(err, res);
  }
};

exports.getAttemptedPapers = async (req, res) => {
  const { userID } = req.user;
  try {
    const attemptedPapers = await db.attemptedPapers.findAll({
      where: {
        userID,
      },
      raw: true,
    });
    // updating the attempted papers
    for (paper in attemptedPapers) {
      const { paperID } = attemptedPapers[paper];
      const ok = await paperAttempted.already(paperID, userID);
      if (ok == -1) throw "Some error occured";
      if (ok == 1) {
        await db.attemptedPapers.update(
          { finished: true },
          {
            where: {
              paperID,
              userID,
            },
          }
        );
      }
    }
    const data = new Object();
    data.attemptedPapers = await db.attemptedPapers.findAll({
      include: db.mockpapers,
      where: {
        userID,
        finished: true,
      },
      raw: true,
    });
    utilities.sendSuccess("Got attempted papers", res, data);
  } catch (err) {
    console.log(`401 ${err}`);
    utilities.sendError(err, res);
  }
};

exports.subscribeToExam = async (req, res) => {
  const { examID } = req.params;
  const { userID } = req.user;
  try {
    const exam = await db.exams.findOne({ where: { id: examID } });
    if (!exam) {
      console.log("This exam does not exist");
      utilities.sendError("This exam does not exist", res);
    }
    const subscribed = await db.subscriptions.findOne({
      where: { examID, userID },
    });
    if (subscribed) {
      throw "User already subscribed to this exam";
    }
    const newSubscription = db.subscriptions.build({
      id: uuid.v1(),
      examID,
      userID,
    });
    await newSubscription.save();
    utilities.sendSuccess("success", res, newSubscription);
  } catch (err) {
    console.log(`401 ${err}`);
    utilities.sendError(err, res);
  }
};
