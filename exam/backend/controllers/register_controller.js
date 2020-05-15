const db = require('../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function hash_password( password ){
    return await bcrypt.hash( password , 10 ) ;
}
async function validate_password( plain_password , hashed_password ){
    return  await bcrypt.compare( plain_password , hash_password ) ;
}
function validate_fields ( req ){
    if ( req.body.name == "" )
        throw "Empty name " ;    
    const role = req.body.role ;
    if ( role < 1 || role > 3 )
        throw "Invalid role " ;    
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = req.body.email ;
    if(!re.test(email) || email == "" )
        throw "Invalid email" ;   
    const found_entry = db.email_mapping.findByPk(email).then( (email_mapping) =>{
        throw "User already exists" ;
    }).catch( (err) =>{
        console.log(' Valid credentials OK') ;
    }) ;
}
exports.add_user = async( req , res , next ) => {
    try{
        const t_name = req.body.name ;
        const t_email = req.body.email ;
        const t_role = req.body.role ;
        const t_hashed_password = await hash_password( req.body.password ) ;
        validate_fields( req ) ;
        const newUser = db.user.build({name:t_name , email:t_email , password:t_hashed_password , role:t_role }) ;
        await newUser.save() ;
        const accessToken = jwt.sign({userId:newUser._id} , process.env.JWT_SECRET , {
            expiresIn : "1d"
        }) ;
        newUser.accessToken = accessToken ;
        await newUser.save() ;
        const newMapping = db.email_mapping.build({email:t_email , id : newUser.id}) ;
        await newMapping.save() ;
        res.json({
            data : newUser , 
            accessToken
        })
    }catch(err){
        console.log( '401 ' + err  ) ;
        // next can redirect to home page
        next(err) ;
    }
}