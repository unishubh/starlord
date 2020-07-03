const validators = require('../../utilities/validations/admin_authorize')
const utilities = require('../../helpers/utilities');
const sequelize = require('sequelize')
const db = require('../../models')
const uuid = require('uuid') ;
module.exports.InsertQuestions = async (req, res) => { 
    let paperID = req.params.paperID;
    let options = req.body.options; //Frontend will provide this is an array of options
    let correctAns = req.body.correctAns;
    let type = req.body.type; //This will be always finite
    let question = req.body.question; // The question text
    let posMark = req.body.posMark; //int
    let negMark = req.body.posMark; //neg
    //check if the user has authority over the paper he is trying to insert into
    try {
        if(!validators.isAccessible('paperID',paperID,"")) { //todo:send agency id after taking it from jwt
            utilities.sendNotAllowed("Admin not allowed for this exam", res);
        }
        let questionData = {} ;
        questionData['type'] = type ;
        questionData['options'] = options ;
        questionData['correctAns'] = correctAns ;
        questionData['question'] = question ;
        questionData['posMark'] = posMark ;
        questionData['negMark'] = negMark ;
        // await db.sequelize.query("UPDATE questions set questions = JSON_ARRAY_APPEND(questions, '$' , '" +JSON.stringify(data)+"') where paperID = '"+paperID+"';" );
        let lasQuestion = await db.questions.findAll({
            limit:1,
            where:{
                paperID ,
            },
            order:[['createdAt' , 'DESC']],
            raw:true
        }) ;
        console.log(lasQuestion) ;
        let newIID ;
        if (!(lasQuestion).length){
            newIID = 1 ;
        }
        else{
            newIID = lasQuestion[0].iid + 1 ;
        }
        console.log(newIID) ;
        let newData =  db.questions.build({ id:uuid.v4(), iid : newIID , paperID, qnJSON:questionData}) ;
        await newData.save();
        utilities.sendSuccess(newData, res);
    }
    catch (e) {
        console.log(e);
        utilities.sendError(e,res);
    }
}