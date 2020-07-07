const db = require('../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const utilities = require('../helpers/utilities');
const getJwtCred = require('../helpers/get_jwt_credentials') ;
const createJSON = require('../helpers/createJSONresponse') ;
const uuid = require('uuid') ;


module.exports.ofExam = async( req , res ) => {
    try{
        let paperID = req.params.paperID ;
        let paper = await db.mockpapers.findOne({ 
            where:{
                id:paperID
            }
        }) ;
        if(!paper)
            throw "Paper with this paper ID does not exist" ;
        let examID = paper.examID ;    
        let exam = await db.exams.findOne({
            where:{
                id:examID
            }
        }) ;
        if(!exam)
            throw "This exam does not exist" ;
        return exam.duration ;    
    }
    catch(err){
        console.log(err) ;
        utilities.sendError(err,res) ;
    }
}