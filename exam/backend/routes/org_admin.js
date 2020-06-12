const express = require('express') ;
const router = express.Router() ;
const sess_auth = require('../utilities/validations/session_authorize') ;
const admin_auth = require('../utilities/validations/admin_authorize') ;
const createExamController = require('../controllers/admin/create_exam_controller') ;
const getExamsController = require('../controllers/admin/get_exams_controller') ;
const createPaperController = require('../controllers/admin/create_paper_controller') ;
const getPapersController = require('../controllers/admin/get_papers_controller') ;
const createAgencyController = require('../controllers/admin/create_agency');
const insertQuestions = require('../controllers/exam/insertQuestions');


router.post('/create_exam' , sess_auth.basicAuth , admin_auth.basicAuth , createExamController.createExam ) ;
router.get('/get_exams' , sess_auth.basicAuth , admin_auth.basicAuth , getExamsController.byAgency ) ;
router.post('/create_paper' , sess_auth.basicAuth , admin_auth.basicAuth , createPaperController.createPaper ) ;
router.get('/get_papers' , sess_auth.basicAuth , admin_auth.basicAuth , getPapersController.byExam ) ;
router.get('/create_agency/:name', sess_auth.basicAuth, admin_auth.basicAuth,  createAgencyController.createAgency);
router.post('/add_questions/:paperID', sess_auth.basicAuth, admin_auth.basicAuth,  insertQuestions.InsertQuestions);

module.exports = router ;