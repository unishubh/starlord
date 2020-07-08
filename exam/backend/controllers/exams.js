const db = require('../models') ;
const utilities = require('../helpers/utilities');
const uuid = require('uuid');

exports.getAllExams = async (req , res ) =>{
    try{
        let { count , rows } = await db.exams.findAndCountAll();
        let subscribedExams = await db.subscriptions.findAndCountAll() ;
        let exams = {} ;
        exams['examcount'] = count ;
        exams['examdata'] = rows ;
        exams['subscribedExams'] = subscribedExams ;
        res.status(200) ;
        res.send(exams) ;
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}

exports.createExam = async ( req , res  ) =>{
    const newAgencyID = req.user.agencyID ;
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
        utilities.sendSuccess('success', res, newExam);
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}

exports.getExamsByAgencyID = async (req , res ) =>{
    try{
        let newAgencyID = req.user.agencyID ;
        let { count , rows } = await db.exams.findAndCountAll({
            where :{
                agencyID : newAgencyID
            },
            attributes: [ 'id' , 'name' ]
        });
        console.log(count) ;
        let exams = {} ;
        exams['examcount'] = count ;
        exams['examdata'] = rows ;
        utilities.sendSuccess("success",res, exams);
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}

exports.getExamByID = async(req, res) =>{
    try{
        let examID = req.params.examID ;
        let exam = await db.exams.findOne({where: {id:examID}}) ;
        if (!exam){
            console.log("Exam does not exist");
            utilities.sendError("Exam does not exist", res);
            return
        }
        utilities.sendSuccess("success", res, exam);
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}

exports.getExamByUserID = async(req, res) =>{
    const userID = req.user.userID;
    try{
        let { count , rows } = await db.subscriptions.findAndCountAll({
            include : db.exams,
            where :{ userID  },
        });

        if (!count){
            console.log("No Subscribed exams exist");
            utilities.sendError("No Subscribed exams exist", res);
            return
        }
        utilities.sendSuccess('success', res, rows);
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}

exports.getAttemptedPapers = async (req , res ) =>{
    const userID = req.user.userID;
    try{
        let { count , rows } = await db.attemptedPapers.findAndCountAll({
            where :{ userID  },
        });
        let exams = {} ;
        exams['papercount'] = count ;
        exams['paperdata'] = rows ;
        utilities.sendSuccess("success", res, exams);
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}

exports.subscribeToExam = async(req , res ) =>{
    let examID = req.params.examID ;
    let userID = req.user.userID;
    try{
        let exam = await db.exams.findOne({where: {id:examID }}) ;
        if ( !exam ){
            console.log('This exam does not exist') ;
            utilities.sendError('This exam does not exist', res);
        }
        let subscribed = await db.subscriptions.findOne({where: {examID , userID }}) ;
        if ( subscribed ){
            throw "User already subscribed to this exam" ;
        }
        let newSubscription = db.subscriptions.build({id:uuid.v1() , examID , userID } ) ;
        await newSubscription.save() ;
        utilities.sendSuccess("success", res, newSubscription);
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}