import React, { useContext } from 'react';
import './Navbar.css';
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
    
    return(
    //     <div className="demo-big-content" style={{position :"fixed"}}>
    //     <Layout>
    //         <Header className='header-color' title="Title"  scroll>
    //             <Navigation>
    //                 <Link to="/">Home</Link>
    //                 <Link to="/studentsignin">Signin</Link>
    //                 <Link to="/register">Sign Up</Link>
    //                 <Link to="/contact">Contact</Link>
    //             </Navigation>
    //         </Header>
    //         {/* <Drawer title="Title">
    //             <Navigation>
    //                 <Link to="#">Link</Link>
    //                 <Link to="#">Link</Link>
    //                 <Link to="#">Link</Link>
    //                 <Link to="#">Link</Link>
    //             </Navigation>
    //         </Drawer> */}
    //         <Content>
    //             <div className="page-content" />
    //         </Content>
    //     </Layout>
    // </div>
    <div className="header-area">
    <div className="main-header ">
        <div className="header-top d-none d-lg-block">
            {/* <!-- Left Social --> */}
            <div className="header-left-social">
                <ul className="header-social">    
                    <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                    <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                    <li><Link to="#"><i className="fab fa-linkedin-in"></i></Link></li>
                    <li> <Link to="#"><i className="fab fa-google-plus-g"></i></Link></li>
                </ul>
            </div>
            <div className="container">
                <div className="col-xl-12">
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="header-info-left">
                            <ul>     
                                <li>onlineexam@gmail.com </li>
                                <li>+91-XXXXXXXXXX   : </li>
                            </ul>
                        </div>
                        <div className="header-info-right">
                            <ul> 
                                { !token ?
                                ( 
                                    <>
                                    <li><Link to="/signin"><i className="ti-user"></i>Login</Link></li>
                                    <li><Link to="/register"><i className="ti-lock"></i>Register</Link></li>
                                    <li><Link to="/createagency"><i className="ti-book"></i>Create Agency</Link></li>
                                    </>
                                    
        
                                ) : (
                                    <>
                                    <li><Link onClick={handleLogout} to="/"><i className="ti-user"></i>Logout </Link></li>
                                    </>
                                )

                                }
                            </ul>
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
                        <Link to="index.html"><img src="assets/img/logo/logo.png" alt="" /></Link>
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
                    <div className="header-search d-none d-lg-block">
                        <form action="#" className="form-box f-right ">
                            <input type="text" name="Search" placeholder="Search Exams" />
                            <div className="search-icon">
                                <i className="fas fa-search special-tag"></i>
                            </div>
                        </form>
                    </div>
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