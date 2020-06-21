const express = require('express') ;
const router = express.Router() ;
const sess_auth = require('../utilities/validations/session_authorize') ;
const admin_auth = require('../utilities/validations/admin_authorize') ;

const { route } = require('./org_admin');

const attemptPaperController = require('../controllers/exam/attempt_paper');

router.post('/attempt_paper/:paperID' , sess_auth.basicAuth , attemptPaperController.byPaperId) ;
module.exports = router ;