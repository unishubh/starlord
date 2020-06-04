const db = require('../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const utilities = require('../helpers/utilities');

exports.createExam = async ( req , res  ) =>{
    let new_agency_id = req.body.agency_id ;
    let new_name = req.body.name ;
    let new_details = req.body.details ;
    let new_max_marks = req.body.max_marks ;    
    let new_time = req.body.time ;
    let new_avg_marks = req.body.avg_marks ;
    console.log(new_agency_id) ;
    let agency = await db.agency.findOne({where: {agency_id:new_agency_id}});
    if (!agency){
        console.log("Agency does not exist");
        utilities.sendError("Agency does not exist", res);
        return 
    }
    try{
        let newExam = db.exams.build({ agency_id:new_agency_id , name:new_name , details:new_details , max_marks:new_max_marks , time:new_time , 
        avg_marks:new_avg_marks }) ;
        await newExam.save() ;
        utilities.sendSuccess(newExam, res);
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}