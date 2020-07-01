import React,{useEffect,useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { UserContext } from '../UserContext';
import swal from 'sweetalert';
import { TableSortLabel } from '@material-ui/core';





function MyAttemptedPapers(){
    const accessToken = localStorage.getItem("token");
    const {token,setToken} = useContext(UserContext);
    const history = useHistory();
    const [isLoading,setIsLoading] = useState(false);
    const [papers,setPapers] = useState([]);
    const [total,setTotal] = useState(0);
    useEffect(
        
        ()=>{
            setIsLoading(true);
            console.log("uius");
            fetch('https://www.mutualfundcalculator.in/starlord/user/my_attempted_papers ',{
                method: 'GET',
                headers: {'Content-Type': 'application/json',
                          'Authorization' : 'Bearer ' + accessToken   },
               
              
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
                  setPapers(data.paperdata);
                  setTotal(data.papercount);
                
                setIsLoading(false);
              
                }
              ).catch(
                (error) => {
                  swal({
                    title: "Oops",
                    text: "Something went wrong " + error,
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
                                    <h2>Your Attempted Papers{isLoading ? <>IS LOADING..</> : <>: {total}</>}</h2>
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
                                    <div className="country">Paper</div>
                                    <div className="visit">Attempted On</div>
                                    <div className="percentage">Description</div>
                                    
                                </div>
                               { papers.map((paper,key)=>(
                                <div className="table-row" id={key}>
                                    <div className="serial">{key+1}</div>
                                    <div className="country"> {paper.id}</div>
                                    <div className="visit">{}</div>
                                    <div className="visit">{}</div>
                                    
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

export default MyAttemptedPapers;