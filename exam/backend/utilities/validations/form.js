const db = require('../../models') ;
const sequelize = require('sequelize') ;
const validate_email = require('./email') ;
const validate_password = require('./password') ;
exports.register_form = async ( req , res ) => {
    await validate_email.register( req , res ) ;
    console.log('mark') ;
    validate_password.register( req , res ) ;
    console.log('mark1') ;
    if ( req.body.name == "" ){
        res.status(400) ;
        res.send({
        "message" : "Empty name " 
        }) ;
    }    
    const role = req.body.role ;
    if ( role < 1 || role > 3 ){
        res.status(400) ;
        res.send({
        "message" : "Wrong role value " 
        }) ;     
    }    
}