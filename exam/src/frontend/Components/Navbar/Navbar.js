import React, { useContext } from 'react';
import './Navbar.css';
import {useHistory} from 'react-router-dom';
import {UserContext} from '../UserContext';
function Navbar()
{
    const history = useHistory();
    const {token,setToken} = useContext(UserContext);
    // let token = localStorage.getItem("token");
    const handleLogout = () =>{
        localStorage.removeItem("token");
        setToken(localStorage.getItem("token"));
        console.log("hi");
        console.log(token);
        history.replace('/about');

    };
    
    return(
    //     <div className="demo-big-content" style={{position :"fixed"}}>
    //     <Layout>
    //         <Header className='header-color' title="Title"  scroll>
    //             <Navigation>
    //                 <a href="/">Home</a>
    //                 <a href="/studentsignin">Signin</a>
    //                 <a href="/register">Sign Up</a>
    //                 <a href="/contact">Contact</a>
    //             </Navigation>
    //         </Header>
    //         {/* <Drawer title="Title">
    //             <Navigation>
    //                 <a href="#">Link</a>
    //                 <a href="#">Link</a>
    //                 <a href="#">Link</a>
    //                 <a href="#">Link</a>
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
                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                    <li> <a href="#"><i className="fab fa-google-plus-g"></i></a></li>
                </ul>
            </div>
            <div className="container">
                <div className="col-xl-12">
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="header-info-left">
                            <ul>     
                                <li>onlineexam@gmail.com </li>
                                <li>+91-XXXXXXXXXX</li>
                            </ul>
                        </div>
                        <div className="header-info-right">
                            <ul> 
                                { !token ?
                                ( 
                                    <>
                                    <li><a href="/signin"><i className="ti-user"></i>Login</a></li>
                                    <li><a href="/register"><i className="ti-lock"></i>Register</a></li>
                                    </>
                                    
        
                                ) : (
                                    <>
                                    <li><a onClick={handleLogout} href="#"><i className="ti-user"></i>Logout </a></li>
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
                <a href="/"><img src="assets/img/logo/logo.png" alt="" /></a>
            </div>
            <div className="container">
                <div className="menu-wrapper">
                    {/* <!-- Logo --> */}
                    <div className="logo logo2 d-block d-lg-none">
                        <a href="index.html"><img src="assets/img/logo/logo.png" alt="" /></a>
                    </div>
                    {/* <!-- Main-menu --> */}
                    <div className="main-menu d-none d-lg-block">
                        <nav>
                            <ul id="navigation">                                                                                          
                                <li><a href="/">Home</a></li>
                                <li><a href="/about">About</a></li>
                                <li><a href="/exams">Exams</a></li>
                                {/* <li><a href="instructor.html">Instructors</a></li> */}
                                {/* <li><a href="blog.html">Blog</a>
                                    <ul class="submenu">
                                        <li><a href="blog.html">Blog</a></li>
                                        <li><a href="blog_details.html">Blog Details</a></li>
                                        <li><a href="elements.html">Element</a></li>
                                    </ul>
                                </li> */}
                                <li><a href="/createexam">Create New Exam</a></li>
                                <li><a href="/contact">Contact</a></li>
                                
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