const db = require('../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const utilities = require('../helpers/utilities');
const jwtcred = require('../helpers/get_jwt_credentials') ;

exports.total = async ( req , res ) =>{
    try{
        let { count , rows } = await db.exams.findAndCountAll();
        let userID = await jwtcred.userID(req,res) ;
        let subscribedExams = await db.subscriptions.findAndCountAll({
            where:{
                userID ,
            },
            attributes : [ 'examID' ] ,
        }) ;
        let exams = new Object() ;
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