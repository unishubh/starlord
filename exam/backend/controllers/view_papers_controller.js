const db = require('../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const utilities = require('../helpers/utilities');

exports.byExam = async(req,res) =>{
    try{
        let newExamID = req.params.examID ;
        console.log(newExamID) ;
        let { count , rows } = await db.mockpapers.findAndCountAll({
            where :{
                examID : newExamID
            },
        });
        console.log(count) ;
        if (!count){
            console.log("Papers do not exist");
            utilities.sendError("Papers do not exist", res);
            return 
        }
        utilities.sendSuccess(rows, res);
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}