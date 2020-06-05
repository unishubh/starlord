const db = require('../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const utilities = require('../helpers/utilities');

exports.byExam = async ( req , res ) =>{
    try{
        let newExamId = req.body.examId ;
        let { count , rows } = await db.mockpapers.findAndCountAll({
            where :{
                examId : newExamId
            },
            attributes: [ 'id' , 'name' ]
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