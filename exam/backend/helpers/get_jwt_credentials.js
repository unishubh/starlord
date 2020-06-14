const jwt = require('jsonwebtoken');
const utilities = require('utilities.js');

exports.userID = async ( req , res ) => {
    const token =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(token, 'base64').toString('ascii');
    console.log(credentials) ;
    jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
        if(err){
            console.log('There was an error in getting the UserID from JWT') ;
            utilities.sendError(err, res);
        }    
        return user.userID ;
    });
}

exports.agencyId = async ( req , res ) => {
    const token =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(token, 'base64').toString('ascii');
    console.log(credentials) ;
    jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
        if(err){
            console.log('There was an error in getting the agencyID from JWT') ;
            utilities.sendError(err, res);
        }    
        return user.agencyID ;
    });
}

exports.role = async ( req , res ) => {
    const token =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(token, 'base64').toString('ascii');
    console.log(credentials) ;
    jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
        if(err){
            console.log('There was an error in getting the role from JWT') ;
            utilities.sendError(err, res);
        }    
        return user.role ;
    });
}

exports.allFields = async ( req , res ) => {
    const token =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(token, 'base64').toString('ascii');
    console.log(credentials) ;
    jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
        if(err){
            console.log('There was an error processing the JWT') ;
            utilities.sendError(err, res);
        }    
        return user ;
    });
}