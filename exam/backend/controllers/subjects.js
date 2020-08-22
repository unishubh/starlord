const db = require('../models') ;
const utilities = require('../helpers/utilities');
const uuid = require('uuid');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;


exports.addSubject = async (req, res) => {
  const { name } = req.body;

  try {
    let sub = db.subjects.build({id : uuid.v1(), name , isVerified:false})
    await sub.save();
    utilities.sendSuccess("success",res,sub);
  } catch (e) {
    console.log(e);
    utilities.sendError(e, res);
  }
};

module.exports.getSubjects = async (req, res) => {
  const {query} = req.params;

  try {
    let sub = await db.subjects.findAll({
      where: {
        name : {
         [Op.like]: query+"%",
        }
      }
    });
    utilities.sendSuccess("success", res, sub);
  } catch (e) {
    console.log(e);
    utilities.sendError(e, res);
  }
}

module.exports.verifySubject = async (req, res) => {
  const {subjectID} = req.params;
  try {
    let status = await db.subjects.update( {
        isVerified:true,
      },
      {
        where : {
          id:subjectID,
        }
      }

    );
    utilities.sendSuccess("success", res, status);

  } catch (e) {
    console.log(e);
    utilities.sendError(e, res);
  }
}
