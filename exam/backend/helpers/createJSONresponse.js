const db = require('../models') ;
const sequelize = require('sequelize') ;

exports.ofQns = async ( req , res ) => {
    try{
        let newPaperID = req.params.paperID ;
        let { count , qns } = db.questions.findAndCountAll({
            where :{
                paperID : newPaperID
            },
            attributes: [ 'id'  ]
        });
        let examineeResponse = new Object() ;
        for ( id in rows )
            examineeResponse[id] = "" ;
        return examineeResponse ;    
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res) ;
    }
}