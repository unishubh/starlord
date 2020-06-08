const express = require('express') ;
const register_controller = require( '../controllers/register_controller.js' ) ;
const login_controller = require( '../controllers/login_controller.js' ) ;

const router = express.Router() ;

<<<<<<< HEAD
router.post('/register' , register_controller.add_user) ;
router.post('/login' , login_controller.login ) ;

=======
router.post('/register/' , register_controller.add_user) ;
router.post('/login/' , login_controller.login ) ;
>>>>>>> upstream/master
module.exports = router ;
