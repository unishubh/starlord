const db = require('../../models') ;
const uuid = require('uuid') ;
const jwt = require('jsonwebtoken');
const utilities = require('../../helpers/utilities');

exports.createPaper = async ( req , res ) => {
    let newExamID = req.body.examID ;
    let newName = req.body.name ;
    let newTotalQns = req.body.totalQns ;
    
    try{
        let exam = await db.exams.findOne({where: {id:newExamID}});
        if (!exam){
            console.log("Exam does not exist");
            utilities.sendError("Exam does not exist", res);
            return 
        }
        let newPaper = db.mockpapers.build({ id: uuid.v1(), examID:newExamID , name:newName , totalQns:newTotalQns }) ;
        await newPaper.save() ;
        utilities.sendSuccess(newPaper, res);
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}