const db = require('../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const utilities = require('../helpers/utilities');

exports.byExam = async(req,res) =>{
    try{
        let examId = req.params.id ;
        console.log(examId) ;
        let exam = await db.exams.findOne({where: {id:examId}}) ;
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