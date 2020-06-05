const db = require('../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const utilities = require('../helpers/utilities');

exports.createExam = async ( req , res  ) =>{
    let new_agency_id = req.body.agencyId ;
    let new_name = req.body.name ;
    let new_details = req.body.details ;
    let new_max_marks = req.body.max_marks ;    
    let new_time = req.body.time ;
    console.log(new_agency_id) ;
    try{
        let agency = await db.agency.findOne({where: {id:new_agency_id}});
        if (!agency){
            console.log("Agency does not exist");
            utilities.sendError("Agency does not exist", res);
            return 
        }
        let newExam = db.exams.build({ agencyId:new_agency_id , name:new_name , details:new_details , max_marks:new_max_marks , time:new_time }) ;
        await newExam.save() ;
        utilities.sendSuccess(newExam, res);
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}