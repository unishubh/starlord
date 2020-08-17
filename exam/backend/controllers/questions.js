const validators = require('../utilities/validations/admin_authorize')
const utilities = require('../helpers/utilities');
const db = require('../models')
const uuid = require('uuid') ;
const updateResponse = require('../helpers/updateUserResponse') ;

module.exports.InsertQuestions = async (req, res) => {
    let paperID = req.params.paperID;
    let options = req.body.options; //Frontend will provide this is an array of options
    let correctAns = req.body.correctAns;
    let type = req.body.type; //This will be always finite
    let question = req.body.question; // The question text
    let posMark = req.body.posMark; //int
    let negMark = req.body.negMark; //neg
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
        let newIID ;
        if (!(lasQuestion).length){
            newIID = 1 ;
        }
        else{
            newIID = lasQuestion[0].iid + 1 ;
        }
        let newData =  db.questions.build({ id:uuid.v4(), iid : newIID , paperID, qnJSON:questionData}) ;
        await newData.save();
        utilities.sendSuccess('success', res, newData);
    }
    catch (e) {
        console.log(e);
        utilities.sendError(e,res);
    }
}

module.exports.getQuestionByIntegerID = async (req, res)=>{
    try{
        let qnID = req.body.qnID ;
        let paperID = req.body.paperID ;
        let qn = await db.questions.findOne({
            where:{
                paperID ,
                iid:qnID
            },
            raw:true
        }) ;
        console.log(qn) ;
        let qnToSend = {};
        qnToSend['question'] = qn.qnJSON.question ;
        qnToSend['options'] = qn.qnJSON.options ;
        qnToSend['posMark'] = qn.qnJSON.posMark ;
        qnToSend['negMark'] = qn.qnJSON.negMark ;
        if (!qn)
            throw "Question does not exist" ;
        let userID = req.user.userID ;
        let attempt = await db.attemptedPapers.findOne({
            include : {
                model : db.mockpapers,
                include : [db.exams],

            },
            where:{
                paperID ,
                userID
            },
            raw : true
        }) ;

        if(!attempt) {
            console.log("No previous attempts found, hence this paper was not attempted, please user attemptPaper api")
            utilities.sendError('you need to attempt this paper before fetching the question', res);
        }
        let response = {} ;
        response['question'] = qnToSend ;
        response['startTime'] = attempt.startTime ;
        response['duration'] = attempt["mockpaper.exam.time"];
        response['userResponse'] = await updateResponse.ofUser(req, res) ;
        utilities.sendSuccess('success', res, response)
    }catch(err){
        console.log(err);
        utilities.sendError(err,res) ;
    }
}

module.exports.getNumberOfQuestions = async (req, res) => {
    let { paperID } = req.params
    try {
        let exam = await db.questions.findOne( {
            where: {paperID},
            include : db.mockpapers,
            order:  [
                ['iid', 'DESC']
            ],
            limit: 1,
        });
        let data = {};
        data['maxQuestions'] = exam.mockpaper.totalQns;
        data['currentQuestions'] = exam.iid;
        utilities.sendSuccess("success",res,data);

    } catch (e) {
        console.log(e);
        utilities.sendError(e,res);
    }
}
