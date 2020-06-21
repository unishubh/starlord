const db = require('../models') ;
const sequelize = require('sequelize') ;

exports.ofQns = async ( req , res ) => {
    try{
        let newPaperID = req.params.paperID ;
        let  qns  = await db.questions.findAll({
            where :{
                paperID : newPaperID ,
            },
            attributes: [ 'id'  ] ,
            raw:true ,
        });
        let examineeResponse = new Object() ;
        for ( id in qns ){
            examineeResponse[qns[id]["id"]] = "" ;
        }
        return examineeResponse ;    
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res) ;
    }
} 