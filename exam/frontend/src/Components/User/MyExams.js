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
    useEffect(
        
        ()=>{
            setIsLoading(true);
            console.log("uius");
            fetch('https://www.mutualfundcalculator.in/starlord/user/my_exams',{
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
                  console.log(data);
                  setExams(data.message);
                  setTotal(data.message.length);
                
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
{ 
    isLoading ?  
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
                                    <h2>Your Subscibed Exams {isLoading ? <>IS LOADING..</> : <>: {total}</>}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="whole-wrap"> 
            <div className="container box_1170">
                <div className="section-top-border">
                        <h3 className="mb-30"></h3>
                        <div className="progress-table-wrap">
                            <div className="progress-table">
                                <div className="table-head">
                                    <div className="serial">#</div>
                                    <div className="country">Exam</div>
                                    <div className="visit">Max Marks</div>
                                    <div className="percentage">See Papers</div>
                                    
                                </div>
                               { exams.map((exam,key)=>(
                                <div className="table-row" id={key}>
                                    <div className="serial">{key+1}</div>
                                    <div className="country"> {exam.examID}</div>
                                    <div className="visit">{}</div>
                                    <div className="visit">
                                        <div className="button-group-area mt-10">
                                            <Link to={"/mypapers/"+exam.examID} className="genric-btn primary-border small" >Papers</Link>
                                         </div>
                                    </div>
                                    
                                    {/* <div className="percentage">
                                        <div className="progress">
                                            <div className="progress-bar color-1" role="progressbar" style={{width: "80%"}}
                                                aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div> */}
                                </div>
                                ))}
                                
                            </div>
                        </div>
                </div>
            </div>
        </div> 
    </div>
}
</div>
    );
}

export default MyExams;