const express = require('express') ;
const router = express.Router() ;
const sess_auth = require('../utilities/validations/session_authorize') ;
const admin_auth = require('../utilities/validations/admin_authorize') ;
const createExamController = require('../controllers/create_exam_controller') ;
const getExamsController = require('../controllers/get_exams_controller') ;
const createPaperController = require('../controllers/create_paper_controller') ;
const getPapersController = require('../controllers/get_papers_controller') ;
const viewExamController = require('../controllers/view_exam_controller') ;

router.post('/create_exam' , sess_auth.basicAuth , admin_auth.basicAuth , createExamController.createExam ) ;
router.get('/get_exams' , sess_auth.basicAuth , admin_auth.basicAuth , getExamsController.byAgency ) ;
router.post('/create_paper' , sess_auth.basicAuth , admin_auth.basicAuth , createPaperController.createPaper ) ;
router.get('/get_papers' , sess_auth.basicAuth , admin_auth.basicAuth , getPapersController.byExam ) ;
router.get('/view_exam/:id' , sess_auth.basicAuth , viewExamController.byExam ) ; 
module.exports = router ;