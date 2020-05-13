const express = require('express') ;
const router = express.Router() ;
const user = require('../models/user') ;
const register_controller = require( '../controllers/register_controller.js' ) ;
router.post('/' , register_controller.add_user) ;
module.exports = router ;