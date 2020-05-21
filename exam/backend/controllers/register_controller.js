const db = require('../models') ;
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const passwordHelper = require('../helpers/password');
const utilities = require('../helpers/utilities');

module.exports.add_user = async( req , res , next ) => {
    try{
        let name = req.body.name ;
        let email = req.body.email ;
        let role = req.body.role ;
        let password = req.body.password;
        let userID = uuid.v4();
        let hashed_password = await passwordHelper.hash_password( password ) ;
        await passwordHelper.validate_fields( req ) ;
        let newUser = db.user.build({name , email , password:hashed_password , role, userID}) ;
        await newUser.save() ;
        let accessToken = jwt.sign({userId:newUser.userID, role: newUser.role} , process.env.JWT_SECRET , {
            expiresIn : "1d"
        }) ;
        let data = {
            data : newUser ,
            accessToken
        };

        utilities.sendSuccess(data, res);
    }catch(err){
        console.log( '401 ' + err  ) ;
        // next can redirect to home page
        utilities.sendError(err, res);
        next(err) ;
    }
}