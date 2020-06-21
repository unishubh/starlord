const db = require('../../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const utilities = require('../../helpers/utilities');
const getJwtCred = require('../../helpers/get_jwt_credentials') ;
const createJSON = require('../../helpers/createJSONresponse') ;
const uuid = require('uuid') ;

exports.byPaperId = async ( req , res ) => {
    try{
        let today = new Date();
        let examStartTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let newUserID = await getJwtCred.userID(req,res);
        let newPaperID = req.params.paperID ;
        let paperExist = await db.mockpapers.findOne({
            where:{
                id : newPaperID
            }
        }) ;
        if ( !paperExist ){
            console.log('MockPaper with this paper ID does not exist') ;
            utilities.sendError('MockPaper with this paper ID does not exist' , res ) ;
        }
        let attempted = await db.attemptedPapers.findOne({
            where :{
                userID : newUserID ,
                paperID : newPaperID },
        });
        if ( attempted ){
            // Add the response of answer JSON after creating tempsave table
            console.log('Already attempted this paper') ;
            utilities.sendError('Already attempted this paper' , res ) ;
        }
        let newAttempt = db.attemptedPapers.build({ id : uuid.v4() , userID : newUserID , paperID : newPaperID } ) ;
        await newAttempt.save() ;
        let examineeResponse = await createJSON.ofQns(req,res) ;
        let newResponse = db.userPaperResponse.build( { id : uuid.v4() , userID:newUserID , paperID:newPaperID , response:examineeResponse} ) ;
        await newResponse.save() ;
        let startPaperResponse = new Object() ;
        startPaperResponse['userPaperResponse'] = newResponse ;
        startPaperResponse['startTime'] = examStartTime ;
        res.status(200) ;
        res.send(startPaperResponse) ;
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res) ;
    }
}



// {
//     "type" : "1" ,
//       "question" : "To be or not to be" ,
//       "correctAns" : "be" ,
//       "posMark" : "1" ,
//       "options" : [ "be" , "notbe" ] ,
//       "negmark" : "0.5"
//   }
  
  