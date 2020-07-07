const db = require('../../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const utilities = require('../../helpers/utilities');
const getJwtCred = require('../../helpers/get_jwt_credentials') ;
exports.byExam = async ( req , res ) =>{
    try{
        let newExamID = req.body.examID ;
        let { count , rows } = await db.mockpapers.findAndCountAll({
            where :{
                examID : newExamID
            },
            attributes: [ 'id' , 'name' ]
        });
        console.log(count) ;
        let exams = new Object() ;
        let userID = await getJwtCred.userID(req,res) ;
        let attemptedPapers = await db.attemptedPapers.findAll({
            where:{
                userID ,
            } ,
            attributes : [ 'paperID' ] ,
            raw : true ,
        }) ;
        exams['attemptedPapers'] = attemptedPapers ;
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