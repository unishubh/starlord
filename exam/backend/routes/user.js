const db = require('../models') ;
const express = require('express') ;
const sess_auth = require('../utilities/validations/session_authorize') ;
const admin_auth = require('../utilities/validations/admin_authorize') ;
const register_controller = require( '../controllers/register_controller.js' ) ;
const login_controller = require( '../controllers/login_controller.js' ) ;
const viewExamController = require('../controllers/view_exam_controller') ;
const viewPapersController = require('../controllers/view_papers_controller') ;
const createAgencyController = require('../controllers/admin/create_agency') ;
const subscribeController = require('../controllers/user/subscribe_controller') ;
const myExamsController = require('../controllers/user/myExams_controller') ;
const getAllExamsController = require('../controllers/get_all_exams_controller') ;
const getAllattemptedPapersController = require('../controllers/user/myAttemptedPapers_controller') ;
const { route } = require('./org_admin');
const router = express.Router() ;

router.post('/register' , register_controller.add_user) ;
router.post('/login' , login_controller.login ) ;
router.get('/view_exam/:examID' , sess_auth.basicAuth , viewExamController.byExam ) ;
router.get('/view_papers/:examID' , sess_auth.basicAuth , viewPapersController.byExam ) ;
router.post('/subscribe/:examID' , sess_auth.basicAuth , subscribeController.toExam) ;
router.get('/my_exams' , sess_auth.basicAuth , myExamsController.byUserID) ;
router.get('/getallexams' , getAllExamsController.total ) ;
router.get('/my_attempted_papers' , sess_auth.basicAuth , getAllattemptedPapersController.allPapers ) ;
// For testing purpose
router.post('/create_agency/:name' , createAgencyController.createAgency ) ;
router.post('/attemptpaper/:paperID' , getAllattemptedPapersController.testApi ) ;


module.exports = router ;
