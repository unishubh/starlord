const express = require('express') ;
const router = express.Router() ;
const user = require('../models/user') ;
const login_controller = require( '../controllers/login_controller.js' ) ;
router.get('/' , register_controller.get_user) ;
module.exports = router ;