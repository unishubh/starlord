import React,{useContext,useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from './UserContext';
import swal from 'sweetalert';
import Select from 'react-select';
function Papers(){
    const {token,setToken} = useContext(UserContext);
    const [options,setOptions] = useState([]);
    const [examID,setExamID] = useState("");
    const [isLoading,setIsLoading] =useState(true)
    useEffect(
        
        ()=>{
            const accessToken = localStorage.getItem("token");
            fetch('https://www.mutualfundcalculator.in/starlord/user/getallexams',
                
                )
                .then(response =>{
                // console.log(response);
                  if(response.ok)
                  return response.json();
                  else{
                    alert(response.status)
                    throw new Error(response.status);
                  }
                })
                .then(data => {
                  console.log(data);
                  data.examdata.map((exam,key) => {
                    
                      if(exam.agencyID === token.agencyID){
                        options.push({'value':exam.id,'label':exam.name})
                       
                        
                      }
                      
                    });
                
                setIsLoading(false);
              
                }
              ).catch(
                (error) => {
                  swal({
                    title: "Oops",
                    text: "Something went wrong " + error,
                    icon: "success",
                    button: "Got it",
                  });
                //   history.push('/');  

                }
              )

              console.log(options);
        },[]
    );
    useEffect(
        
        ()=>{
            const accessToken = localStorage.getItem("token");
            fetch('https://www.mutualfundcalculator.in/starlord/admin/get_papers',{
                method : 'POST',
                header : {'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + accessToken   },
                body : JSON.stringify({
                    examID : examID
                })
            }
                )
                .then(response =>{
                // console.log(response);
                  if(response.ok)
                  return response.json();
                  else{
                    alert(response.status)
                    throw new Error(response.status);
                  }
                })
                .then(data => {
                  console.log(data);
                  
                
                setIsLoading(false);
              
                }
              ).catch(
                (error) => {
                  swal({
                    title: "Oops",
                    text: "Something went wrong " + error,
                    icon: "success",
                    button: "Got it",
                  });
                //   history.push('/');  

                }
              )

              console.log(options);
        },[examID]
    );
    return( 
    <div>
        <div className="slider-area">
            <div className="slider-height2 d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="hero-cap hero-cap2 text-center">
                                <h2>Your Papers</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br/><br/>
        <div className="col-sm-6">
                                <Select
                                    placeholder="Select Exam"
                                    onChange={e=> setExamID(e.value)}
                                    options={options}
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
                                    <div className="visit">Number of Questions</div>
                                    <div className="visit">Description</div>
                                    <div className="visit">Preview</div>
                                    <div className="visit">Edit</div>
                                </div>
                               { options.map((paper,key)=>(
                                <div className="table-row" id={key}>
                                    <div className="serial">{paper.sr}</div>
                                    <div className="country"> {paper.name}</div>
                                    <div className="visit">{paper.paperid}</div>
                                    <div className="visit">{paper.description}</div>
                                    <div className="visit">
                                    <div className="button-group-area mt-10">
                                    <Link to={"/preview/"+paper.paperid} className="genric-btn primary-border small" >Preview</Link></div>
                                    </div>
                                    <div className="visit">
                                    <div className="button-group-area mt-10">
                                    <Link to={"/addquestion/"+paper.paperid} className="genric-btn primary-border small" >Edit</Link></div>
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
    );
}

export default Papers;