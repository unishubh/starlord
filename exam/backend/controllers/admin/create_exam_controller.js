const db = require('../../models') ;
const uuid = require('uuid') ;
const jwt = require('jsonwebtoken');
const utilities = require('../../helpers/utilities');

exports.createExam = async ( req , res  ) =>{
    let newAgencyID ;
    const token =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(token, 'base64').toString('ascii');
    jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
        if(err){
            console.log('There was an error in getting the agencyID from JWT') ;
            utilities.sendError(err, res);
            
        }    
        newAgencyID = user.agencyID ;
    });
    let new_name = req.body.name ;
    let new_details = req.body.details ;
    let new_max_marks = req.body.maxMarks ;
    let new_time = req.body.time ;
    console.log(newAgencyID) ;
    try{
        let agency = await db.agency.findOne({where: {id:newAgencyID}});
        if (!agency){
            console.log("Agency does not exist");
            utilities.sendError("Agency does not exist", res);
            return 
        }
        let newExam = db.exams.build({id: uuid.v1(), agencyID:newAgencyID , name:new_name , details:new_details , max_marks:new_max_marks , time:new_time }) ;
        await newExam.save() ;
        utilities.sendSuccess(newExam, res);
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
} 