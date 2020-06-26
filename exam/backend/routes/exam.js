const express = require('express') ;
const router = express.Router() ;
const sess_auth = require('../utilities/validations/session_authorize') ;
const admin_auth = require('../utilities/validations/admin_authorize') ;

const { route } = require('./org_admin');
const getQnController = require('../controllers/exam/get_question') ;
const attemptPaperController = require('../controllers/exam/attempt_paper');

router.post('/attempt_paper/:paperID' , sess_auth.basicAuth , attemptPaperController.byPaperId) ;
router.post('/get_question' , sess_auth.basicAuth , getQnController.byIID) ;
module.exports = router ;


// "0657533e-d6b7-4146-86d6-1d03a4bdb157": "",
//       "4a8e12e3-f99d-4126-8992-899928891acd": "",
//       "65d067f7-32ef-4bf0-be63-e0254368ff0e": "",
//       "7d6a9f23-4ed3-4e0a-a5e1-701db25fe3d3": "",
//       "bdfcf511-3bd8-4757-875a-e8ae05e9b2c7": "",
//       "faef4084-8f1d-4d77-8944-e985af4cc5da": ""