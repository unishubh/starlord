const db = require('../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function validate_password( plain_password , hashed_password ){
    return  await bcrypt.compare( plain_password , hashed_password ) ;
}

exports.login = async ( req , res , next ) => {
    try{
        const t_email = req.body.email ;
        const t_password = req.body.password ;
        const email_pid_mapper = await db.email_mapping.findOne({where:{email : t_email}}) ;
        if ( !email_pid_mapper )
            throw "User with this email does not exist " ;
        const user_id = email_pid_mapper.id ;
        const user = await db.user.findOne({where:{id : user_id}}) ;
        const match_password = await validate_password ( t_password , user.password ) ;
        if ( !match_password )
            throw "Wrong password entered" ;
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        user.accessToken = accessToken ;
        await user.save() ; 
        res.status(200).json({
            data: { email: user.email, role: user.role },
            accessToken
           }) ;
    }catch(err){
        console.log( '401 : ' + err ) ;
        next( err ) ;
    }
} ;