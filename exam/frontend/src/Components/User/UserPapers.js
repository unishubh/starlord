import React,{useContext,useEffect,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import {UserContext} from '../UserContext';
import swal from 'sweetalert';
import Select from 'react-select';
function UserPapers(){
    const {token,setToken} = useContext(UserContext);
    const [options,setOptions] = useState([]);
    // const [examID,setExamID] = useState(null);
    const [isLoading,setIsLoading] =useState(true);
    const [examName,setExamName] = useState("");
    const [papers,setPapers] = useState([]);
    const [papercount,setPapercount] = useState(null);
    const {examID} = useParams();
    const accessToken = localStorage.getItem("token");
    useEffect(
        
        ()=>{
          
            setIsLoading(true);
            console.log("uius");
           console.log(examID);
            fetch('https://www.mutualfundcalculator.in/starlord/api/paper/exam/'+examID,{
                
                method: 'GET',
                headers: {'Content-Type': 'application/json',
                          'Authorization' : 'Bearer ' + accessToken   }
               }
               
            
                )
                .then(response =>{
                console.log(response);
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
                //   setPapers(data.paperdata)
                let c = 0;
                  const attempted = data.attemptedPapers;
                  const papers1 = data.paperdata;
                  papers1.map((paper,i)=>{
                    let f = 0;
                    attempted.map((attempt,key)=>{
                        if(attempt.paperID==paper.id)
                        {
                            f=1;
                        }
                    })
                    if(f==0)
                    {
                        papers.push(paper);
                        c = c+1;
                    }
                  })
                  

                  setPapercount(c);
                  if(c==0)
                  {
                    swal({
                        title: "Oh",
                        text: "There is no paper left to attempt ",
                        icon: "warning",
                        
                      });
                      window.history.back();
                  }
                  
                
                setIsLoading(false);
              
                }
              ).catch(
                (error) => {
                  swal({
                    title: "Oops",
                    text: "This exam have no papers yet ",
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
                                   <h2>Your Papers{isLoading ? <>IS LOADING..</> : <> : {papercount}</>}</h2>
                                    <button  onClick={e=>window.history.back()}  className="btn hero-btn"  data-animation="fadeInLeft" data-delay=".8s">Back</button>
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
                       
                          { token.role==2 ?
                                       <>
                                       <div className="button-group-area mt-10">
                                       <Link to={"/attemptpaper/"+paper.id+"/"+paper.name} className="genric-btn primary-border small" >Attempt Now</Link>
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

export default UserPapers;