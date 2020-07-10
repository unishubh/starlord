import React,{useEffect,useContext, useState} from 'react';
import {useHistory,Link,useParams} from 'react-router-dom';
import { UserContext } from '../UserContext';
import swal from 'sweetalert';
import { TableSortLabel } from '@material-ui/core';





function MyExams(){
    const accessToken = localStorage.getItem("token");
    const {token,setToken} = useContext(UserContext);
    const history = useHistory();
    const [isLoading,setIsLoading] = useState(false);
    const [exams,setExams] = useState([]);
    const [total,setTotal] = useState(0);
    const [search_item,setSerach_item] = useState("");
    const [search_results,setSearch_result] = useState([]);
    useEffect(() => {
        { const results = exams.filter(exam =>
            exam.exam.name.toLowerCase().includes(search_item.toLocaleLowerCase())
          );
          setSearch_result(results);}
       
      }, [search_item,exams]);
    useEffect(
        
        ()=>{
            setIsLoading(true);
            console.log("uius");
            fetch('https://www.mutualfundcalculator.in/starlord/api/exam/byUser',{
                method: 'GET',
                headers: {'Content-Type': 'application/json',
                          'Authorization' : 'Bearer ' + accessToken   }
                        }
                )   
                .then(response =>{
                // console.log(response);
                setIsLoading(false);
                  if(response.ok)
                  return response.json();
                  else{
                    // alert(response.status)
                    throw new Error(response.status);
                  }
                })
                .then(data => {
                  console.log(data.data);
                  setExams(data.data);
                  setTotal(data.data.length);
                
                setIsLoading(false);
              
                }
              ).catch(
                (error) => {
                  swal({
                    title: "Oops",
                    text: "Something went wrong ",
                    icon: "error",
                    button: "Got it",
                  });
                //   history.push('/');  

                }
              )
        },[]
    );

    return( 

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
                                   <h2>Your Subscribed Exams{isLoading ? <>IS LOADING..</> : <> : {total}</>}</h2>
                                   <button  onClick={e=>history.push('/')}  className="btn hero-btn"  data-animation="fadeInLeft" data-delay=".8s">Home</button>
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
                                            placeholder='Search Your Exam'
                                            value = {search_item}
                                            onChange = {e=>setSerach_item(e.target.value)}
                                               />
                                            <div class="input-group-append"></div>
                                                <button class="btns" type="button"><i class="ti-search"></i></button>
                                            </div>
                                        </div>
                                    {/* </div> */}
                                    
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
                          <h3 style={{color:"white"}}> {exam.exam.name} </h3>
                          </div>
                          </div>
                      <div className="my-own-container">
                      <h5><b>Max Marks : {exam.exam.max_marks}</b></h5> 
                       <h5>Time Duration : {exam.exam.time} {exam.time!==1 ? <>Hours</> : <>Hour</>}</h5>
                       <p>{exam.details}</p>  
                       
                          { token.role==2 ?
                                       <>
                                       <div className="button-group-area mt-10">
                                       <Link to={"/mypapers/"+exam.examID} className="genric-btn primary-border small" >Papers</Link>
                                       </div>
                                      
                                       </>
                                       :<></>
                                               
                                       } 
                                       
                      </div>
              
                      </div>
                  </div>
              </div>  
               )
               
               )}  
                             
           </div>
   
        </div>
        
      
      
        }
   </div>


    );
}

export default MyExams;