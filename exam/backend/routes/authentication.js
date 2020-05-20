const express = require('express') ;
const router = express.Router() ;
const user = require('../models/user') ;
const register_controller = require( '../controllers/register_controller.js' ) ;
const login_controller = require( '../controllers/login_controller.js' ) ;
router.post('/register/' , register_controller.add_user) ;
router.post('/login/' , login_controller.login ) ;
module.exports = router ;