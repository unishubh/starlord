const sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const db = require("../models");
const utilities = require("./utilities");
const getJwtCred = require("./get_jwt_credentials");
const createJSON = require("./createJSONresponse");
const duration = require("./duration");

exports.byUser = async (req, res) => {
  let ok = false;
  try {
    const newUserID = await getJwtCred.userID(req, res);
    const newPaperID = req.params.paperID;
    const attempted = await db.attemptedPapers.findOne({
      where: {
        userID: newUserID,
        paperID: newPaperID,
      },
      raw: true,
    });
    console.log("***");
    console.log(attempted);
    if (attempted) {
      if (attempted.finished) {
        ok = true;
      } else {
        const { startTime } = attempted;
        const currTime = new Date();
        const examDurationMS = (await duration.ofExam(req, res)) * 60 * 1000;
        const timeElapsedMS = currTime - startTime;
        console.log(`examDuration${examDurationMS}`);
        console.log(`startTime${startTime}`);
        console.log(`time elapsed ${timeElapsedMS}`);
        if (timeElapsedMS >= examDurationMS) {
          ok = true;
          await db.attemptedPapers.update(
            { finished: true },
            {
              where: {
                userID: newUserID,
                paperID: newPaperID,
              },
            }
          );
        }
      }
    } else {
      const newStartTime = new Date();
      const newAttempt = db.attemptedPapers.build({
        id: uuid.v4(),
        userID: newUserID,
        paperID: newPaperID,
        finished: false,
        startTime: newStartTime,
      });
      await newAttempt.save();
    }
    return ok;
  } catch (err) {
    console.log(err);
    utilities.sendError(err, res);
  }
};

exports.already = async (paperID, userID) => {
  let ok = 0;
  try {
    const attempted = await db.attemptedPapers.findOne({
      where: {
        userID,
        paperID,
      },
      raw: true,
    });
    console.log("$$$$$$$$$$");
    console.log(attempted);
    if (attempted) {
      if (attempted.finished) ok = 1;
      else {
        const { startTime } = attempted;
        const currTime = new Date();
        // calculating duration
        const paper = await db.mockpapers.findOne({
          where: {
            id: paperID,
          },
        });
        if (!paper) throw "Paper with this paper ID does not exist";
        const { examID } = paper;
        const exam = await db.exams.findOne({
          where: {
            id: examID,
          },
          raw: true,
        });
        if (!exam) throw "This exam does not exist";
        /// ///
        const examDurationMS = exam.time * 60 * 1000;
        const timeElapsedMS = currTime - startTime;
        console.log(`examDuration${examDurationMS}`);
        console.log(`startTime${startTime}`);
        console.log(`time elapsed ${timeElapsedMS}`);
        if (timeElapsedMS >= examDurationMS) {
          ok = 1;
          console.log(`For ${paperID} true`);
          await db.attemptedPapers.update(
            { finished: true },
            {
              where: {
                userID,
                paperID,
              },
            }
          );
        }
      }
    }
    return ok;
  } catch (err) {
    console.log(`${err} returning -1 `);
    return -1;
  }
};
