import React,{useEffect,useContext, useState} from 'react';
import {useHistory,Link} from 'react-router-dom';
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
            fetch('https://www.mutualfundcalculator.in/starlord/api/paper/attempted ',{
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
                  setPapers(data.data.paperdata);
                  setTotal(data.data.papercount);
                
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
        <div className="about-details section-padding10"></div>
   
        <div className="row">
   
                     
            
               {papers.map((paper,key)=>(
                  <div className="col-xl-4 col-lg-4 col-md-6">
                  <div style={{padding:"40px"}}>
                      <div className="my-own-card">
                  
                          <div className="my-own-name" >
                          <div className="hero-cap hero-cap2 text-center">
                          <h3 style={{color:"white"}}> {paper.name} </h3>
                          </div>
                          </div>
                      <div className="my-own-container">
                          <h5><b></b></h5> 
                       
                          { token.role==2 ?
                                       <>
                                       <div className="button-group-area mt-10">
                                       <Link to={"/attemptpaper/"+paper.id+"/"+paper.name} className="genric-btn primary-border small" >Result/Resume </Link>
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

export default MyAttemptedPapers;