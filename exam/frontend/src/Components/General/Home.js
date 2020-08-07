import React, { useContext, useState,useEffect  } from 'react';
import {Link,useHistory} from 'react-router-dom';
import { UserContext } from '../UserContext';
import config from '../config';
import swal from 'sweetalert';

function Home(){
    const history = useHistory();
    const {token,setToken} = useContext(UserContext);
    const [exams,setExams] = useState([]);
    const [total,setTotal] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [search_item,setSerach_item] = useState("");
    const [search_results,setSearch_result] = useState([]);
    const handleLogout = () =>{
        
        console.log("hi");
        localStorage.removeItem("token");
        setToken(null);
        
        console.log(token);
        
        };
        useEffect(
        
            ()=>{
                // console.log("uius");
                fetch(config.apiUrl+'api/exam'
                    )
                    .then(response =>{
                    // console.log(response);
                      if(response.ok)
                      return response.json();
                      else{
                        
                        throw new Error(response.status);
                      }
                    })
                    .then(data => {
                    //   console.log(data);
                      setTotal(data.examcount);
                      setExams(data.examdata);
                    setIsLoading(false);
                  
                    }
                  ).catch(
                    (error) => {
                        if(error==403)
                        {
                      swal({
                          title: "Oh Ohhh",
                          text: "Please Login Again",
                          icon: "warn",
                          button: "Got it",
                        });
                        history.push('/signin')
                        }
                        else{
                      swal({
                        title: "Oops",
                        text: "Something went wrong " + error,
                        icon: "error",
                        button: "Got it",
                      });
                      history.push('/');  
                    }
    
                    }
                  )
            },[]
        );
        useEffect(() => {
            { const results = exams.filter(exam =>
                exam.name.toLowerCase().includes(search_item.toLocaleLowerCase())
              );
              setSearch_result(results);}
           
          }, [search_item,exams]);
    return(
        <div>
        {  !token?
        <>    
        <div>
           { isLoading ?  
           <div>
              <div className="preloader d-flex align-items-center justify-content-center">
                 <div className="preloader-inner position-relative">
                    <div className="preloader-circle"></div>
                    <div className="preloader-img pere-text">
                       <img src="assets/img/logo/loder.png" alt=""/>
                    </div>
                 </div>
              </div>
           </div>
           :
           <div>
              <div className="slider-area">
                 <div className="slider-height2 d-flex align-items-center">
                    <div className="container">
                       <div className="row">
                          <div className="col-xl-12">
                             <div className="hero-cap hero-cap2 text-center">
                                <h2>All Exams {isLoading ? <>IS LOADING..</> : <> : {total}</>}</h2>
                                {/* <button  onClick={e=>window.history.back()}  className="btn hero-btn"  data-animation="fadeInLeft" data-delay=".8s">Back</button> */}
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="about-details section-padding10"></div>
              <div class="col-lg-4">
                 <div class="blog_right_sidebar">
                    <aside class="single_sidebar_widget search_widget">
                       <form >
                          <div class="form-group">
                             <div class="input-group mb-3">
                                <input type="text" 
                                   class="form-control" 
                                   placeholder='Search Exam'
                                   value = {search_item}
                                   onChange = {e=>setSerach_item(e.target.value)}
                                />
                                <div class="input-group-append"></div>
                                <button class="btns" type="button"><i class="ti-search"></i></button>
                             </div>
                          </div>
                          {/* 
                 </div>
                 */}
                 </form>
                 </aside>
              </div>
           </div>
           <div className="row">
              {search_results.map((exam,key)=>(
              <div className="col-xl-4 col-lg-4 col-md-6">
                 <div style={{padding:"40px"}}>
                    <div className="my-own-card">
                       <div className="my-own-name" >
                          <div className="hero-cap hero-cap2 text-center">
                             <h3 style={{color:"white"}}> {exam.name} </h3>
                          </div>
                       </div>
                       <div className="my-own-container">
                          <h5><b>Max Marks : {exam.max_marks}</b></h5>
                          <h5>Time Duration : {exam.time} {exam.time!==1 ? <>Hours</> : <>Hour</>}</h5>
                          <p>{exam.details}</p>
                          {/* 
                          <div className="button-group-area mt-10">
                             <Link to={"/showpapers/"+exam.id} className="genric-btn primary-border small" >
                             Papers</Link>
                          </div>
                          */}
                       </div>
                    </div>
                 </div>
              </div>
              )
              )}  
           </div>
        </div>
        }
        <br></br>  <br></br>  <br></br>
     </div>
     {/* 
     <div className="slider-area ">
        <div className="slider-active">
           <div className="single-slider slider-height d-flex align-items-center">
              <div className="container">
                 <div className="row align-items-center">
                    <div className="col-xl-6 col-lg-7 col-md-8">
                       <div className="hero__caption">
                          <span data-animation="fadeInLeft" data-delay=".2s">Online Exam Platform</span>
                          <h1 data-animation="fadeInLeft" data-delay=".4s">Experience the best way of Online Exams</h1>
                          <div className="hero__btn">
                             { !token ?  
                             <Link to="/signin">
                             <button className="btn hero-btn"  data-animation="fadeInLeft" data-delay=".8s">Login</button></Link>
                             : <button  onClick={handleLogout}  className="btn hero-btn"  data-animation="fadeInLeft" data-delay=".8s">Logout</button>
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
        </div>
     </div>
     */}
     </>
     :
     <>
     { token && token.role==1 ?
     <>
     <div className="categories-area section-padding10">
        <div className="container">
           <div className="row">
              <div className="cl-xl-7 col-lg-8 col-md-10">
                 <div className="section-tittle text-center mb-70">
                    {/* <span>Hi {token.userName}</span>
                    <h2>Lets Get Started</h2>
                    */}
                 </div>
              </div>
           </div>
           <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-6">
                 <div className="single-cat mb-50">
                    <div className="cat-icon">
                       <span className="flaticon-web-design"></span>
                    </div>
                    <div className="cat-cap">
                       <h5>
                          <Link  to="/createexam">
                          Create Exam</Link>
                       </h5>
                       <p>Create an exam.</p>
                    </div>
                 </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                 <div className="single-cat mb-50">
                    <div className="cat-icon">
                       <span className="flaticon-education"></span>
                    </div>
                    <div className="cat-cap">
                       <h5>
                          <Link  to="/createpaper">
                          Create Paper</Link>
                       </h5>
                       <p>Create Mock Papers.</p>
                    </div>
                 </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                 <div className="single-cat mb-50">
                    <div className="cat-icon">
                       <span className="flaticon-business"></span>
                    </div>
                    <div className="cat-cap">
                       <h5>
                          <Link  to="/exams">
                          My Exams</Link>
                       </h5>
                       <p>See your created exams.</p>
                    </div>
                 </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                 <div className="single-cat mb-50">
                    <div className="cat-icon">
                       <span className="flaticon-business"></span>
                    </div>
                    <div className="cat-cap">
                       <h5>
                          <Link  to="/papers">
                          My Mock Paper</Link>
                       </h5>
                       <p>See your created mock papers.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
     </div>
     </>
     :
     <>
     <div className="categories-area section-padding10">
        <div className="container">
           <div className="row justify-content-sm-center">
              <div className="cl-xl-7 col-lg-8 col-md-10">
                 <div className="section-tittle text-center mb-70">
                    {/* <span>Hi {token.userName}</span>
                    <h2>Lets Get Started</h2>
                    */}
                 </div>
              </div>
           </div>
           <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-6">
                 <div className="single-cat mb-50">
                    <div className="cat-icon">
                       <span className="flaticon-web-design"></span>
                    </div>
                    <div className="cat-cap">
                       <h5>
                          <Link  to="/allexams">
                          All Exams</Link>
                       </h5>
                       <p>Explore the exams.</p>
                    </div>
                 </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                 <div className="single-cat mb-50">
                    <div className="cat-icon">
                       <span className="flaticon-education"></span>
                    </div>
                    <div className="cat-cap">
                       <h5>
                          <Link  to="/myexams">
                          My Exams</Link>
                       </h5>
                       <p>See the exams you have subscribed.</p>
                    </div>
                 </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                 <div className="single-cat mb-50">
                    <div className="cat-icon">
                       <span className="flaticon-education"></span>
                    </div>
                    <div className="cat-cap">
                       <h5>
                          <Link  to="/myattemptedpapers">
                          My Attempted Papers</Link>
                       </h5>
                       <p>See the papers you have Attempted.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
     </div>
     </>
     }
     </>
     } 
     <br></br>  <br></br>  <br></br>
     </div>    
    );
}

export default Home;