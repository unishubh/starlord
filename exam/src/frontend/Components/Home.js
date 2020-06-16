import React from 'react';
import {Grid,Cell} from 'react-mdl';
import stu from '../images/students.jpg'

function Home(){

    return(
        <div>
        <div class="slider-area ">
            <div class="slider-active">
                {/* <!-- Single Slider --> */}
                <div class="single-slider slider-height d-flex align-items-center">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-xl-6 col-lg-7 col-md-8">
                                <div class="hero__caption">
                                    <span data-animation="fadeInLeft" data-delay=".2s">Online Exam Platform</span>
                                    <h1 data-animation="fadeInLeft" data-delay=".4s">Experience the best way of Online Exams</h1>
                                    {/* <!-- Hero-btn --> */}
                                    <div class="hero__btn">
                                        <a href="/studentsignin" class="btn hero-btn"  data-animation="fadeInLeft" data-delay=".8s">Login</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-5">
                                <div class="hero-man d-none d-lg-block f-right" data-animation="jello" data-delay=".4s">
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