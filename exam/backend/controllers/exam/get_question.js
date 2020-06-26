const db = require('../../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const utilities = require('../../helpers/utilities');
const getJwtCred = require('../../helpers/get_jwt_credentials') ;
const createJSON = require('../../helpers/createJSONresponse') ;
const uuid = require('uuid') ;
const updateResponse = require('../../helpers/updateUserResponse') ;

module.exports.byIID = async (req,res)=>{
    try{
        let qnID = req.body.qnID ;
        let paperID = req.body.paperID ;
        let qn = await db.questions.findOne({
            where:{
                paperID ,
                iid:qnID
            },
            raw:true
        }) ;
        console.log(qn) ;
        let qnToSend = new Object() ;
        qnToSend['question'] = qn.qnJSON.question ;
        qnToSend['options'] = qn.qnJSON.options ;
        qnToSend['posMark'] = qn.qnJSON.posMark ;
        qnToSend['negMark'] = qn.qnJSON.negMark ;
        console.log(qnToSend) ;
        if (!qn)
            throw "Question does not exist" ;
        let userID = await getJwtCred.userID(req,res) ;
        let attempt = await db.attemptedPapers.findOne({
            where:{
                paperID ,
                userID
            },
            raw : true
        }) ;
        let response = new Object() ;
        response['question'] = qnToSend ;
        response['startTime'] = attempt.startTime ;
        let userResponse = await updateResponse.ofUser(req,res) ;
        response['userResponse'] = userResponse ;
        res.status(200) ;
        res.send(response) ;
    }catch(err){
        console.log(err);
        utilities.sendError(err,res) ;
    }
}

// {
//     "paperID" : "300ea560-b759-11ea-97e5-87ba4b5fa945" ,
//       "qnID" : "2" ,
//       "lastQnID" : "1" ,
//       "lastQnAns" : "55" 
//   }