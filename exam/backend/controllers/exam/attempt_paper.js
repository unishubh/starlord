const db = require('../../models') ;
const utilities = require('../../helpers/utilities');
const getJwtCred = require('../../helpers/get_jwt_credentials') ;
const createJSON = require('../../helpers/createJSONresponse') ;
const uuid = require('uuid') ;
const paperAttempted = require('../../helpers/isAttempted') ;
exports.byPaperId = async ( req , res ) => {
    try{
        let startTime = new Date();
        let newUserID = await getJwtCred.userID(req,res);
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
  
  // 300ea560-b759-11ea-97e5-87ba4b5fa945 paperID
  // d7ab4262-347b-424b-b375-dc7552d199b7 userID