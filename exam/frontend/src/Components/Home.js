import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from './UserContext';

function Home(){
    const {token,setToken} = useContext(UserContext);
    const handleLogout = () =>{
        console.log("hi");
        localStorage.removeItem("token");
        setToken(localStorage.getItem("token"));
        
        console.log(token);
        };
    return(
        <div>
        <div className="slider-area ">
            <div className="slider-active">
                {/* <!-- Single Slider --> */}
                <div className="single-slider slider-height d-flex align-items-center">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-6 col-lg-7 col-md-8">
                                <div className="hero__caption">
                                    <span data-animation="fadeInLeft" data-delay=".2s">Online Exam Platform</span>
                                    <h1 data-animation="fadeInLeft" data-delay=".4s">Experience the best way of Online Exams</h1>
                                    {/* <!-- Hero-btn --> */}
                                    <div className="hero__btn">
                                       { !token ?  <Link to="/signin" className="btn hero-btn"  data-animation="fadeInLeft" data-delay=".8s">Login</Link>
                                       : <Link  onClick={handleLogout} to="/signin" className="btn hero-btn"  data-animation="fadeInLeft" data-delay=".8s">Logout</Link>
                                       }
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-5">
                                <div className="hero-man d-none d-lg-block f-right" data-animation="jello" data-delay=".4s">
                                    <img src="assets/img/hero/heroman.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Single Slider --> */}
                
            </div>
        </div>
        </div>
    );
}

export default Home;