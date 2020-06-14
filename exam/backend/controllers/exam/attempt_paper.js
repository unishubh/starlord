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
        let newUserID = getJwtCred.userID(req,res) ;
        let newPaperID = req.params.paperID ;
        let paperExist = db.mockpapers.findOne({
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
        let examineeResponse = createJSON.ofQns(req,res) ;
        
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res) ;
    }
}