const express = require('express') ;
const sess_auth = require('../utilities/validations/session_authorize') ;
const admin_auth = require('../utilities/validations/admin_authorize') ;
const userController = require('../controllers/user');
const questionController = require('../controllers/questions')
const createAgencyController = require('../controllers/create_agency') ;
const examController = require('../controllers/exams');
const paperController = require('../controllers/paper');
const router = express.Router() ;

//register
router.post('/register/' , userController.addUser) ;
//login
router.post('/login/' , userController.login ) ;



//create a new exam
router.post('/exams/' , sess_auth.basicAuth , admin_auth.basicAuth , examController.createExam ) ;
//subscribe to an exam
router.post('/subscribe/:examID' , sess_auth.basicAuth , examController.subscribeToExam) ;
//get exam details by ID
router.get('/exam/byID/:examID' , sess_auth.basicAuth , examController.getExamByID ) ;
//get exams by User ID
router.get('/exam/byUser/' , sess_auth.basicAuth , examController.getExamByUserID) ;
//get Exams pertaining to a specific agencyID
router.get('/exam/byAgency/' , sess_auth.basicAuth , admin_auth.basicAuth , examController.getExamsByAgencyID ) ;
//getAll exams
router.get('/exam' , examController.getAllExams ) ;



//create a paper in the given examID
router.post('/paper/' , sess_auth.basicAuth , admin_auth.basicAuth , paperController.createPaper ) ;
//get papers by examID
router.get('/paper/exam/:examID' , sess_auth.basicAuth , paperController.getPaperByExam ) ;
//start attempting a paper
router.post('/attempt/:paperID' , sess_auth.basicAuth , paperController.attemptPaperbyPaperID) ;
//get Attempted paper by userID
router.get('/paper/attempted/' , sess_auth.basicAuth , examController.getAttemptedPapers ) ;



//create agency
router.post('/agency/:name',   createAgencyController.createAgency);




//add question to a paper
router.post('/question/:paperID', sess_auth.basicAuth, admin_auth.basicAuth,  questionController.InsertQuestions);
//get next question of the exam currently being attempted
router.get('/question' , sess_auth.basicAuth , questionController.getQuestionByIntegerID) ;



module.exports = router ;
