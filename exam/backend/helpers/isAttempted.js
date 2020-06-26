const db = require('../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const utilities = require('../helpers/utilities');
const getJwtCred = require('../helpers/get_jwt_credentials') ;
const createJSON = require('../helpers/createJSONresponse') ;
const uuid = require('uuid') ;
const duration = require('../helpers/duration') ;
module.exports.byUser = async( req , res ) =>{
    let ok = false ;
    try{
        let newUserID = await getJwtCred.userID(req,res);
        let newPaperID = req.params.paperID ;
        let attempted = await db.attemptedPapers.findOne({
            where :{
                userID : newUserID ,
                paperID : newPaperID },
        });
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
                if ( timeElapsedMS >= examDurationMS )
                    ok = true ;
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