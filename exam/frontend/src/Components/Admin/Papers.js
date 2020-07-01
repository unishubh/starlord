import React,{useContext,useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../UserContext';
import swal from 'sweetalert';
import Select from 'react-select';
function Papers(){
    const {token,setToken} = useContext(UserContext);
    const [options,setOptions] = useState([]);
    const [examID,setExamID] = useState(null);
    const [isLoading,setIsLoading] =useState(true);
    const [examName,setExamName] = useState("");
    const [papers,setPapers] = useState([]);
    const [papercount,setPapercount] = useState(null);
    useEffect(
        
        ()=>{
            
            fetch('https://www.mutualfundcalculator.in/starlord/user/getallexams',
                
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
                  // console.log(data);
                  let f = 0;
                  data.examdata.map((exam,key) => {
                    
                      if(exam.agencyID === token.agencyID){
                        options.push({'value':exam.id,'label':exam.name});
                        if(f==0)
                        {
                          setExamID(exam.id);
                          setExamName(exam.name);
                          f=1;
                        }
                      }
                      
                    });
                
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

              // console.log(options);
        },[]
    );
    useEffect(
        
        ()=>{
            console.log("it started fetching  ",examID);
            setIsLoading(true);
            console.log(JSON.stringify({
              examID : examID
          }));
          // console.log("token.role",token.role);
            const accessToken = localStorage.getItem("token");
            console.log("role is  ", token.role)
            // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJiYWUyZjUzNi1jMGExLTQwNmUtOTRjMy1hNmUzN2NkMmZhZWUiLCJyb2xlIjoxLCJhZ2VuY3lJRCI6IjRiM2FkMDIwLWI4YWQtMTFlYS05NWQ3LWM3MDcyNWY1YzA3NSIsImlhdCI6MTU5MzUyOTE4MywiZXhwIjoxNTkzNjE1NTgzfQ.EVS7XB_pj-o7EJ2nxW_2O5DGO19-JQL7vyGV7TwxuuM"; 
            console.log("token " , accessToken);
            fetch('https://www.mutualfundcalculator.in/starlord/admin/get_papers/',{
                // mode : 'cors',
                method : 'POST',
                headers : {
                  
                  'Content-Type': 'application/json',
                  'Authorization' : 'Bearer ' + accessToken ,
                },
                body : JSON.stringify({
                    examID : examID
                })
            }
                )
                .then(response =>{
                  setIsLoading(false);
                console.log(response);
                  if(response.status == 200)
                  return response.json();
                  else{
                    // alert(response.status)
                    throw new Error(response.status);
                  }
                })
                .then(data => {
                  console.log(data);
                  
                setPapers(data.paperdata);
                setPapercount(data.papercount);
                setIsLoading(false);
              
                }
              ).catch(
                (error) => {
                  swal({
                    title: "Oops",
                    text: "Something went wrong " ,
                    icon: "error",
                    button: "Got it",
                  });
                //   history.push('/');  

                }
              )

            
        },[examID]
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
                                <Select
                                    
                                    onChange={e=> {setExamID(e.value);setExamName(e.label)}}
                                    options={options}
                                    placeholder = {examName} 
                                    // selected 
                                />
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
                                    {/* <div className="visit">Number of Questions</div> */}
                                    {/* <div className="visit">Description</div> */}
                                    <div className="visit">Preview</div>
                                    <div className="visit">Edit</div>
                                </div>
                               { papers.map((paper,key)=>(
                                <div className="table-row" id={key}>
                                    <div className="serial">{key+1}</div>
                                    <div className="country"> {paper.name}</div>
                                    {/* <div className="visit">{paper.paperid}</div> */}
                                    {/* <div className="visit">{paper.description}</div> */}
                                    <div className="visit">
                                    <div className="button-group-area mt-10">
                                    <Link to={"/preview/"+paper.id} className="genric-btn primary-border small" >Preview</Link></div>
                                    </div>
                                    <div className="visit">
                                    <div className="button-group-area mt-10">
                                    <Link to={"/addquestion/"+paper.id} className="genric-btn primary-border small" >Edit</Link></div>
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

export default Papers;