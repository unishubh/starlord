import React,{useContext,useEffect,useState} from 'react';
import {Link,useParams,useHistory} from 'react-router-dom';
import {UserContext} from '../UserContext';
import swal from 'sweetalert';
import Select from 'react-select';
import config from '../config';

function ShowPapers(){
    const {token,setToken} = useContext(UserContext);
    const [options,setOptions] = useState([]);
    // const [examID,setExamID] = useState(null);
    const [isLoading,setIsLoading] =useState(true);
    const [examName,setExamName] = useState("");
    const [papers,setPapers] = useState([]);
    const [papercount,setPapercount] = useState(null);
    const {examID} = useParams();
    const accessToken = localStorage.getItem("token");   
    const history = useHistory();



    useEffect(
        
        ()=>{
          
            setIsLoading(true);
            // console.log("uius");
        //    console.log(examID);
            fetch(config.apiUrl+'api/paper/exam/'+examID,{
                
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
                //   console.log(data);
                  setPapers(data.paperdata)
                  setPapercount(data.papercount)
                  
                
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
                    text: "This exam have no papers yet ",
                    icon: "error",
                    button: "Got it",
                  });
                }
                //   history.push('/');  

                }
              )

            
        },[]
    );
    const Subscribe = (event)=>{

        setIsLoading(true);
        const accessToken = localStorage.getItem("token");
        fetch(config.apiUrl+'api/subscribe/'+event.target.value,{
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + accessToken   },
                                       
                })
                .then(response =>{
                                setIsLoading(false);
                                if(response.ok)  
                                return response.json();
                                else{
                                    throw new Error(response.status)
                                    }
                                } )
                                .then(data => {
                                    // console.log(data);
                                    // console.log(data.message);
                                    swal({
                                     title: "Hey Yaayy !!",
                                                text: "Exam Has Been Subscribed",
                                                icon: "success",
                                                button: "Got it",
                                              });
                                            
                                        history.push('/myexams');

                                        }).catch(
                                    (error)=>{
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
                                    title: "Oh Ohhh",
                                    text: "Either you have already subscribed or Something went wrong",
                                    icon: "error",
                                    button: "Got it",
                                  });
                                }
                                    }
                                    )
                        
}
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
                                   <h2> Papers{isLoading ? <>IS LOADING..</> : <> : {papercount}</>}</h2>
                                   <button value={examID} onClick={Subscribe}  className="btn hero-btn"  data-animation="fadeInLeft" data-delay=".8s">Subscribe</button>
                                   &nbsp;&nbsp;&nbsp;&nbsp;<button  onClick={e=>window.history.back()}  className="btn hero-btn"  data-animation="fadeInLeft" data-delay=".8s">Back</button>
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
                          <h5><b>Total Qns : {paper.totalQns}</b></h5> 
                       
                                       
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
    );
}

export default ShowPapers;