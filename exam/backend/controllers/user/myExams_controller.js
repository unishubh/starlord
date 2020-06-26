const db = require('../../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const utilities = require('../../helpers/utilities');

exports.byUserID = async(req,res) =>{
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
        let { count , rows } = await db.subscriptions.findAndCountAll({
            where :{
                userID : new_userID },
        });
        console.log(count) ;
        if (!count){
            console.log("No Subscrribed exams exist");
            utilities.sendError("No Subscrribed exams exist", res);
            return 
        }
        utilities.sendSuccess(rows, res);
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}