const db = require('../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const utilities = require('../helpers/utilities');
const getJwtCred = require('../helpers/get_jwt_credentials') ;
const createJSON = require('../helpers/createJSONresponse') ;
const uuid = require('uuid') ;

module.exports.ofUser = async(req,res) =>{
    try{
        let lastQnID = req.body.lastQnID ;
        let lastAns = req.body.lastQnAns ;
        let paperID = req.body.paperID ;
        let userID = await getJwtCred.userID(req,res) ;
        let userResponse = await db.userPaperResponse.findOne({
            where:{
                paperID,
                userID
            },
            raw:true
        }) ;
        if ( !userResponse )
            throw "Did not attempt yet" ;    
        //userResponse[userResponse][lastQnID] = lastAns ;
        console.log(userResponse) ;
        userResponse.response[lastQnID] = lastAns ;
        await db.userPaperResponse.update( {response:userResponse.response} ,{
            where :{
                paperID,
                userID
            }
        }) ;
        let sendBackResponse = new Object() ;
        sendBackResponse = userResponse.response ;
        return sendBackResponse ;   

    }catch(err){
        console.log(err) ;
        utilities.sendError(err,res) ;
    }
}