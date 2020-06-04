const express = require('express') ;
const router = express.Router() ;
const sess_auth = require('../utilities/validations/session_authorize') ;
const admin_auth = require('../utilities/validations/admin_authorize') ;
const createExamController = require('../controllers/create_exam_controller') ;
router.post('/create_exam' , sess_auth.basicAuth , admin_auth.basicAuth , createExamController.createExam) ;
module.exports = router ;