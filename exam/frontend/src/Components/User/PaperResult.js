import React,{useContext,useEffect,useState} from 'react';
import {Link,useParams,useHistory} from 'react-router-dom';
import {UserContext} from '../UserContext';
import swal from 'sweetalert';
import Select from 'react-select';
import config from '../config';

function PaperResult(){
    const {token,setToken} = useContext(UserContext);
    const [options,setOptions] = useState([]);
    // const [examID,setExamID] = useState(null);
    const [isLoading,setIsLoading] =useState(true);
    const [examName,setExamName] = useState("");
    const [correctResponse,setCorrectResponse] = useState({});
    const [userResponse,setUserResponse] = useState({});
    const {paperID,paperName} = useParams();
    const [totalMarks,setTotalMarks] = useState(0);
    const [marksObtained,setMarksObtained] = useState(0);
    const [compare,setCompare] = useState([]);
    const accessToken = localStorage.getItem("token");   
    const history = useHistory();



    useEffect(
        
        ()=>{
          
            setIsLoading(true);
            // console.log("uius");
           console.log(paperID);
            fetch(config.apiUrl+'api/paper/results/'+paperID,{
                
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
                  setCorrectResponse(data.data.correctResponse);
                  setUserResponse(data.data.userRespnse.response);
                  const correct = data.data.correctResponse;
                  const user = data.data.userRespnse;
                //   console.log(correct);
                //   console.log(user);
                  let t = 0;
                  let g = 0;
                  for(var i=1;i<=Object.keys(user.response).length;i++)
                 {
                    //  console.log(user.response[i]);
                     t=t+Number(correct[i].posMark);
                    //  console.log(t);
                     if(correct[i].correctAns==user.response[i])
                     {
                         g=g+Number(correct[i].posMark);
                     }
                     else{
                         g=g-Number(correct[i].negMark);
                     }
                 }
                 setTotalMarks(t);
                 setMarksObtained(g);
                  
                
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
                    text: "Something went wrong ",
                    icon: "error",
                    button: "Got it",
                  });
                }
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
        <div className="button-group-area mt-10" style={{paddingtop:"10px",paddingLeft:"50px"}}>
           
            
            <button onClick={e=>window.history.back()} class="genric-btn danger-border circle">Back</button>
            
        </div>
            <h1 align="center">Result - {paperName}</h1>
            <h2 align="center">Marks : {marksObtained}/{totalMarks}</h2>
             
        <div class="whole-wrap">
            <div class="container box_1170">
                <div className="section-top-border">
                
                    
                    {  Object.keys(correctResponse).map((key)=>{
                        return(
                        <>
                        <h5>Question No.{key}</h5>
                         <p align="right"> Pos Mark : {correctResponse[key].posMark}  &nbsp;&nbsp; Neg Mark : -{correctResponse[key].negMark} </p>
                        <div className="row">
                            <div className="col-lg-12">
                                {
                                    correctResponse[key].correctAns !== userResponse[key]?
                                <blockquote className="generic-blockquote" style={{background:"#ffded8"}}>
                                    {correctResponse[key].question}
                                    <br></br>
                                    <p>Your Answer : {userResponse[key]}<br>
                                    </br>
                                    Correct Answer : {correctResponse[key].correctAns}</p>
                                   
                                </blockquote>
                                :
                               <blockquote className="generic-blockquote" style={{background:"#90ee90"}}>
                                    {correctResponse[key].question}
                                    <br></br>
                                    <p>Your Answer : {userResponse[key]}<br></br>
                                    Correct Answer : {correctResponse[key].correctAns}</p>
                               </blockquote>
                                }
                              
                               
                               
                                
                                <br></br>
                            </div>
                        </div> 

                                </>
                        )
                    })}
                    
                    </div>
            </div>
             
            
        </div>
    
    
    
    
    
    
    </div>
}
<br></br>  <br></br>  <br></br>
    </div>
    );
}

export default PaperResult;