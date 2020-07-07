const db = require('../models') ;
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const passwordHelper = require('../helpers/password');
const utilities = require('../helpers/utilities');


module.exports.addUser = async(req , res , next ) => {
    try{
        let name = req.body.name ;
        let email = req.body.email ;
        let role = req.body.role ;
        let password = req.body.password;
        let userID = uuid.v4();
        let hashed_password = await passwordHelper.hash_password( password ) ;
        let agencyID = req.body.agencyID ;
        await passwordHelper.validate_fields( req ) ;
        let newUser = db.user.build({name , email , password:hashed_password , role, id:userID , agencyID}) ;
        await newUser.save() ;
        let accessToken = jwt.sign({userID:newUser.id, role: newUser.role , agencyID: newUser.agencyID} , process.env.JWT_SECRET , {
            expiresIn : "1d"
        }) ;
        let data = {
            data : newUser ,
            accessToken
        };

        utilities.sendSuccess('success', res, data);
    }catch(err){
        console.log( '401 ' + err  ) ;
        // next can redirect to home page
        utilities.sendError(err, res);
        next(err) ;
    }
}

exports.login = async ( req , res, next  ) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let user = await db.user.findOne({where: {email}});
        if (!user) {
            console.log("User does not exist");
            utilities.sendNotAllowed("invalid user", res);
            return
        }
        let match_password = await passwordHelper.validate_password(password, user.dataValues.password);
        if (!match_password) {
            console.log("invalid password");
            utilities.sendNotAllowed("invalid password", res);
            return
        }
        let accessToken = jwt.sign({userID:user.id, role: user.role , agencyID: user.agencyID}, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        utilities.sendSuccess( "success", res, accessToken);
    }
    catch (err) {
        console.log(err);
        utilities.sendError(err,res);
        next(err);

    }
}