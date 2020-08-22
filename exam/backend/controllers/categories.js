const db = require('../models') ;
const utilities = require('../helpers/utilities');
const uuid = require('uuid');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;


exports.addCategory = async (req, res) => {
  const { name } = req.body;

  try {
    let sub = db.categories.build({id : uuid.v1(), name , isVerified:false})
    await sub.save();
    utilities.sendSuccess("success",res,sub);
  } catch (e) {
    console.log(e);
    utilities.sendError(e, res);
  }
};

module.exports.getCategories = async (req, res) => {
  const {query} = req.params;

  try {
    let sub = await db.categories.findAll({
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

module.exports.verifyCategory = async (req, res) => {
  const {categoryID} = req.params;
  try {
    let status = await db.categories.update( {
        isVerified:true,
      },
      {
        where : {
          id:categoryID,
        }
      }

    );
    utilities.sendSuccess("success", res, status);

  } catch (e) {
    console.log(e);
    utilities.sendError(e, res);
  }
}
