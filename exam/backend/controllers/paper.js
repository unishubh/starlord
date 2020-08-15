const db = require('../models') ;
const uuid = require('uuid') ;
const utilities = require('../helpers/utilities');
const createJSON = require('../helpers/createJSONresponse') ;
const paperAttempted = require('../helpers/isAttempted') ;

exports.createPaper = async ( req , res ) => {
    let newExamID = req.body.examID ;
    let newName = req.body.name ;
    let newTotalQns = req.body.totalQns ;

    try{
        let exam = await db.exams.findOne({where: {id:newExamID}});
        if (!exam){
            console.log("Exam does not exist");
            utilities.sendError("Exam does not exist", res);
            return
        }
        let newPaper = db.mockpapers.build({ id: uuid.v1(), examID:newExamID , name:newName , totalQns:newTotalQns }) ;
        await newPaper.save() ;
        utilities.sendSuccess('success', res, newPaper);
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}

exports.getPaperByExam = async (req , res ) =>{
    try{
        let newExamID = req.params.examID ;
        let { count , rows } = await db.mockpapers.findAndCountAll({
            where :{
                examID : newExamID
            },
        });

        let exams = {} ;
        let userID = req.user.userID;
        exams['attemptedPapers'] = await db.attemptedPapers.findAll({
            include: db.mockpapers,
            where: {
                userID,
            },
            raw: true,
        }) ;
        exams['papercount'] = count ;
        exams['paperdata'] = rows ;
        res.status(200) ;
        res.send(exams) ;
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}

exports.attemptPaperbyPaperID = async (req , res ) => {
    try{
        let startTime = new Date();
        let newUserID = req.user.userID;
        let newPaperID = req.params.paperID ;
        let paperExist = await db.mockpapers.findOne({
            include : db.exams,
            where:{
                id : newPaperID
            }
        }) ;
        if ( !paperExist ){
            console.log('MockPaper with this paper ID does not exist') ;
            utilities.sendError('MockPaper with this paper ID does not exist' , res ) ;
        }
        let attemptExpired = await paperAttempted.byUser(req,res) ;
        if( attemptExpired ){
            throw "User has already finished the paper" ;
        }
        let alreadyResponse = await db.userPaperResponse.findOne({
            where:{
                userID : newUserID ,
                paperID : newPaperID ,
            },
            raw : true ,
        }) ;
        if (!alreadyResponse){
            let examineeResponse = await createJSON.ofQns(req,res) ;
            let newResponse = db.userPaperResponse.build( { id : uuid.v4() , userID:newUserID , paperID:newPaperID , response:examineeResponse} ) ;
            await newResponse.save() ;
        }
        let userResponse = await db.userPaperResponse.findOne({
            where:{
                userID : newUserID ,
                paperID : newPaperID ,
            },
            raw : true ,
        }) ;
        let startPaperResponse = {} ;
        let firstQuestion = await db.questions.findOne({
            where:{
                iid:1,
                paperID: newPaperID
            },
            raw:true
        }) ;
        if ( !firstQuestion )
            throw "There are no questions in this paper" ;
        startPaperResponse['firstQuestion'] = firstQuestion ;
        startPaperResponse['userPaperResponse'] = userResponse ;

        let attempted = await db.attemptedPapers.findOne({
            where :{
                userID : newUserID ,
                paperID : newPaperID },
            raw:true,
        });

        startPaperResponse['startTime'] = attempted.startTime ;
        startPaperResponse['duration'] = paperExist.exam.time ;

        utilities.sendSuccess('success', res, startPaperResponse);
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res) ;
    }
}

exports.endExam = async(req,res) =>{
    try{
        let paperID = req.params.paperID ;
        let userID = req.user.userID;
        await db.attemptedPapers.update(
            {finished:true},
            {where:{
                paperID,
                userID
            }}) ;
        utilities.sendSuccess("Exam Ended" , res , paperID) ;
    }catch(err){
        utilities.sendError("Error :" + err , res ) ;
    }
}

exports.showResults = async( req , res ) =>{
    try{
        let paperID = req.params.paperID ;
        let userID = req.user.userID; ;
        let compare = {} ;
        compare['userRespnse'] = await db.userPaperResponse.findOne({
            where:{
                paperID,
                userID ,
            },
            attributes : ['response'] ,
            raw:true,    
        });
        let qnData = await db.questions.findAll({
             where : {paperID} ,
            attributes : ['iid' , 'qnJSON'] ,
            raw : true ,
        }) ;
        let correctResponse = {} ;
        for ( qn in qnData ){
            correctResponse[qnData[qn]['iid']] = qnData[qn]['qnJSON'] ;
        } 
        compare['correctResponse'] = correctResponse ;
        utilities.sendSuccess("Got responses to compare " , res , compare ) ;

    }catch(err){
        console.log(err);
        utilities.sendError(err,res);
    }
}