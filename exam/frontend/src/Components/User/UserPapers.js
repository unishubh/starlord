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
            fetch('https://www.mutualfundcalculator.in/starlord/user/view_papers/'+examID,{
                
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
                  setPapers(data.message)
                  setPapercount(data.message.length)
                  
                
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
     { isLoading ? <div>
         
         <div className="preloader d-flex align-items-center justify-content-center">
             <div className="preloader-inner position-relative">
                 <div className="preloader-circle"></div>
                 <div className="preloader-img pere-text">
                     <img src="assets/img/logo/loder.png" alt=""/>
                 </div>
             </div>
         </div>
 
     </div> :
    <div>
        <div className="slider-area">
            <div className="slider-height2 d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="hero-cap hero-cap2 text-center">
                                <h2>Your Papers : {papercount}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br/><br/>
        <div className="col-sm-6">
                               
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
                                    <div className="visit">Number of Questions</div> 
                                    <div className="visit">Total Marks</div>
                                    <div className="visit">Attempt </div>
                                    {/* <div className="visit">Edit</div> */}
                                </div>
                               { papers.map((paper,key)=>(
                                <div className="table-row" id={key}>
                                    <div className="serial">{key+1}</div>
                                    <div className="country"> {paper.name}</div>
                                    <div className="visit">{paper.totalQns}</div>
                                    <div className="visit">{paper.totalMarks}</div>
                                    <div className="visit">
                                    <div className="button-group-area mt-10">
                                    <Link to={"/attemptpaper/"+paper.id+"/"+paper.name} className="genric-btn primary-border small" >Attempt Now</Link></div>
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

export default UserPapers;