const db = require('../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const utilities = require('../helpers/utilities');
const getJwtCred = require('../helpers/get_jwt_credentials') ;
const createJSON = require('../helpers/createJSONresponse') ;
const uuid = require('uuid') ;
const duration = require('../helpers/duration') ;

exports.byUser = async( req , res ) =>{
    let ok = false ;
    try{
        let newUserID = await getJwtCred.userID(req,res);
        let newPaperID = req.params.paperID ;
        let attempted = await db.attemptedPapers.findOne({
            where :{
                userID : newUserID ,
                paperID : newPaperID },
            raw:true,    
        });
        console.log('***') ;
        console.log(attempted) ;
        if(attempted){
            if ( attempted.finished ){
                ok = true ;
            }else{
                let startTime = attempted.startTime ;
                let currTime = new Date() ;
                let examDurationMS = await duration.ofExam(req,res)  * 60 * 1000 ;
                let timeElapsedMS = currTime - startTime ;
                console.log('examDuration' + examDurationMS ) ;
                console.log('startTime' + startTime ) ;
                console.log('time elapsed ' + timeElapsedMS ) ;
                if ( timeElapsedMS >= examDurationMS ){
                    ok = true ;
                    await db.attemptedPapers.update(
                        {finished:true},
                        {where:{
                            userID : newUserID ,
                            paperID : newPaperID ,
                        }}
                    ) ;
                }
            }
        }else{
            let newStartTime = new Date() ;
            let newAttempt = db.attemptedPapers.build({ id : uuid.v4() , userID : newUserID , paperID : newPaperID , finished:false , startTime : newStartTime } ) ;
            await newAttempt.save() ;
        } 
        return ok ;
    }catch(err){
        console.log(err);
        utilities.sendError(err,res);
    }
}

exports.already = async(paperID,userID) => {
    let ok = 0 ;
    try{
        let attempted = await db.attemptedPapers.findOne({
            where:{
                userID,
                paperID
            },
            raw:true,
        }) ;
        console.log('$$$$$$$$$$') ;
        console.log(attempted) ;
        if (attempted){
            if ( attempted.finished )
                ok = 1 ;
            else{
                let startTime = attempted.startTime ;
                let currTime = new Date() ;
                // calculating duration
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
                    },
                    raw:true,
                }) ;
                if(!exam)
                    throw "This exam does not exist" ;
                //////
                let examDurationMS = exam.time * 60 * 1000 ;
                let timeElapsedMS = currTime - startTime ;
                console.log('examDuration' + examDurationMS ) ;
                console.log('startTime' + startTime ) ;
                console.log('time elapsed ' + timeElapsedMS ) ;
                if ( timeElapsedMS >= examDurationMS ){
                    ok = 1 ;
                    console.log('For ' + paperID + " true" ) ;
                    await db.attemptedPapers.update(
                        {finished:true},
                        {where:{
                            userID ,
                            paperID ,
                        }}
                    ) ;
                }
            }    
        }
        return ok ;
    }catch(err){
        console.log( err + " returning -1 " ) ;
        return -1 ;
    }
}