const db = require('../../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const utilities = require('../../helpers/utilities');

exports.allPapers = async ( req , res ) =>{
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
        let { count , rows } = await db.attemptedPapers.findAndCountAll({
            where :{
                userID : new_userID },
        });
        console.log(count) ;
        let exams = new Object() ;
        exams['papercount'] = count ;
        exams['paperdata'] = rows ;
        res.status(200) ;
        res.send(exams) ;
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}

exports.testApi = async ( req , res ) => {
    let newattemptedpaper = db.attemptedPapers.build( { id:2 , userID : '1afea76b-5b7c-46c3-9a8a-470f46ff2370'  , paperID : 'c8d9d8f0-acf0-11ea-9841-a57efda5d95a'}) ;
    await newattemptedpaper.save() ;
    utilities.sendSuccess(newattemptedpaper, res);
}