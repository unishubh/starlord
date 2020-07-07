import React, { useContext } from 'react';
import './Navbar.module.css';
import {useHistory,Link} from 'react-router-dom';
import {UserContext} from '../UserContext';
function Navbar()
{
    const history = useHistory();
    const {token,setToken} = useContext(UserContext);
   
    // console.log("role ",token.role);
    const handleLogout = () =>{
        localStorage.removeItem("token");
        setToken(null);
        console.log("hi");
        console.log(token);
        history.push('/');

    };

    const handleLogin = () =>{
        history.push('/signin');
    }
    
    return(
  
    <div className="header-area">
    <div className="main-header ">
    <div class="header-top d-none d-lg-block">
               
                    <div class="header-left-social">
                        <ul class="header-social">    
                            <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                            <li><a href="https://www.facebook.com/sai4ull"><i class="fab fa-facebook-f"></i></a></li>
                            <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                            <li> <a href="#"><i class="fab fa-google-plus-g"></i></a></li>
                        </ul>
                    </div>
                    <div class="container">
                        <div class="col-xl-12">
                            <div class="row d-flex justify-content-between align-items-center">
                                <div class="header-info-left">
                                    <ul>     
                                        <li>needhelp@gmail.com</li>
                                        <li>666 7475 25252</li>
                                    </ul>
                                </div>
                                <div class="header-info-right">
                                    <ul>    
                                        {!token?
                                        <>
                                        <li><Link to="/signin"><i class="ti-user"></i>Login</Link></li>
                                        <li><Link to="/register"><i class="ti-lock"></i>Register</Link></li>
                                        </>
                                        :
                                        <li><Link onClick={handleLogout} to="/"><i class="ti-lock"></i>Logout</Link></li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        <div className="header-top d-none d-lg-block">
            {/* <!-- Left Social --> */}
           
            <div className="container">
                <div className="col-xl-12">
                    <div className="row d-flex justify-content-between align-items-center">
                        
                        <div className="header-info-right">
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="header-bottom header-sticky">
            {/* <!-- Logo --> */}
            <div className="logo d-none d-lg-block">
                <Link to="/"><img src="assets/img/logo/logo.png" alt="" /></Link>
            </div>
           

            
            <div className="container">
                <div className="menu-wrapper">
                    {/* <!-- Logo --> */}
                    <div className="logo logo2 d-block d-lg-none">
                    {token?
                        <button onClick={handleLogout} className="genric-btn primary-border">Logout</button>
                                :
                                <button 
                                className="genric-btn primary-border"
                                onClick={handleLogin}>Login/Register</button>
                    }
                    </div>
                    {/* <!-- Main-menu --> */}
                    <div className="main-menu d-none d-lg-block">
                        <nav>
                            <ul id="navigation">                                                                                          
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/allexams">All Exams</Link></li>
                              {token && token.role===1? 
                                <>
                                <li><Link to="/admin">Admin</Link>
                                    <ul className="submenu">
                                        <li><Link to="/createexam">Create Exam</Link></li>
                                        <li><Link to="/createpaper">Create Paper</Link></li>
                                        <li><Link to="/exams">See Exams</Link></li>
                                        <li><Link to="/papers">See Papers</Link></li>
                                    </ul>
                                </li>
                                </>
                                :
                                <>
                                {/* {token} */}
                                <li><Link to="#">Options</Link>
                                    <ul className="submenu">
                                        <li><Link to="/myexams">My Exams</Link></li>
                                        <li><Link to="/myattemptedpapers">Attemped Paper</Link></li>
                                      
                                    </ul>
                                </li>
                                </>
                                }
                              
                                <li><Link to="/contact">Contact</Link></li>
                                
                            </ul>
                        </nav>
                    </div>
                    {/* <!-- Header-btn --> */}
                    
                </div>
                {/* <!-- Mobile Menu --> */}
                <div className="col-12">
                    <div className="mobile_menu d-block d-lg-none"></div>
                </div>
            </div>
        </div>
    </div>
</div>
    );
}

export default Navbar;