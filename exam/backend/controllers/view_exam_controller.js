const db = require('../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const utilities = require('../helpers/utilities');

exports.byExam = async(req,res) =>{
    try{
        let examID = req.params.examID ;
        console.log(examID) ;
        let exam = await db.exams.findOne({where: {id:examID}}) ;
        if (!exam){
            console.log("Exam does not exist");
            utilities.sendError("Exam does not exist", res);
            return 
        }
        utilities.sendSuccess(exam, res);
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}