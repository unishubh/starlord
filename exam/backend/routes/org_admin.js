const express = require('express') ;
const router = express.Router() ;
const sess_auth = require('../utilities/validations/session_authorize') ;
const admin_auth = require('../utilities/validations/admin_authorize') ;
const createExamController = require('../controllers/create_exam_controller') ;
const get_exams = require('../controllers/get_exams') ;
router.post('/create_exam' , sess_auth.basicAuth , admin_auth.basicAuth , createExamController.createExam) ;
router.get('/get_exams' , sess_auth.basicAuth , admin_auth.basicAuth , get_exams.byAgency ) ;
module.exports = router ;