const db = require('../../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const utilities = require('../../helpers/utilities');
const uuid = require('uuid');

exports.toExam = async( req , res ) =>{
    let new_examID = req.params.examID ;
    const token =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(token, 'base64').toString('ascii');
    console.log(credentials) ;
    let new_userID = "" ;
    jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
        if(err){
            console.log('There was an error in getting the UserID from JWT') ;
            utilities.sendError(err, res);
            
        }    
        new_userID = user.userID ;
        console.log(user.userID) ;
    });
    try{
        let exam = await db.exams.findOne({where: {id:new_examID }}) ;
        if ( !exam ){
            console.log('This exam does not exist') ;
            utilities.sendError('This exam does not exist', res);
        }
        let subscribed = await db.subscriptions.findOne({where: {examID:new_examID , userID:new_userID}}) ;
        if ( subscribed ){
            throw "User already subscribed to this exam" ;
        }
        let newSubscription = db.subscriptions.build({id:uuid.v1() , examID:new_examID , userID : new_userID } ) ;
        await newSubscription.save() ;
        utilities.sendSuccess(newSubscription, res);
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}