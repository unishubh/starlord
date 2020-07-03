import React, { useEffect, useState } from 'react';
import {useHistory,useParams} from 'react-router-dom';
import swal from 'sweetalert';
import { Next } from 'react-bootstrap/PageItem';

function AttemptPaper(){
    const history = useHistory();
    const {paperID,paperName} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isStarted,setIsStarted] = useState(false);
    const accessToken = localStorage.getItem("token");
    const [startTime,setStartTime] = useState(null);
    const [totalQns,setTotalQns] = useState(0);

    const [question_no,setQuestion_no] = useState(null);
    const [question,setQuestion] = useState("");
    const [options,setOptions] = useState([]);
    const [posMark,setPosMark] = useState(null);
    const [negMark,setNegMark] = useState(null);
    const [type,setType] = useState(null);
    const [userPaperResponse,setUserPaperResponse] = useState({});
    const [userResponse,setUserResponse] = useState([]);
    const [move,setMove] = useState(false);
    
    const [answer,setAnswer] = useState(null);
    

    useEffect(
        () => {
            
            

            console.log("fkj",userResponse);
        },[isLoading]
    );
    const StartExam = () =>{
            setIsLoading(true);
            setIsStarted(true);
            fetch('https://www.mutualfundcalculator.in/starlord/exam/attempt_paper/'+paperID,{
                
                method : 'POST',
                headers: {'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + accessToken   },
            })
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
                  setQuestion_no(data.firstQuestion.iid);
                  setQuestion(data.firstQuestion.qnJSON.question);
                  setType(data.firstQuestion.qnJSON.type);
                  setPosMark(data.firstQuestion.qnJSON.posMark);
                  setNegMark(data.firstQuestion.qnJSON.negMark);
                  setOptions(data.firstQuestion.qnJSON.options);
                  setStartTime(data.firstQuestion.startTime);
                  var size = Object.keys(data.userPaperResponse.response).length;
                  if(size>0)
                  setUserPaperResponse(data.userPaperResponse.response);
                 
                  setTotalQns(size);
                //   Object.entries(data.userPaperResponse.response).map(([key, value]) => {
                //     userResponse.push(value);
                   
                //     // Pretty straightforward - use key for the key and value for the value.
                //     // Just to clarify: unlike object destructuring, the parameter names don't matter here.
                // })

                
  
  
  
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
    };
    const EndExam = () => {

    };

    useEffect(
        ()=>{
            console.log(answer);
        },[answer]
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
            {
            !isStarted ?
            <></>
            :
            <button onClick={EndExam} class="genric-btn danger-border circle">End Exam</button>
            }
        </div>
            <h1 align="center">Paper - {paperName}</h1>
            {
            !isStarted ?
            <div align="center">
            <button onClick={StartExam} class="genric-btn success-border circle">Start Exam</button>
            </div>
            :
            <></>
            }
            {/* {isLoading ?
            <div>isLoading...</div> : <div>PreviewPaper</div> } */}


        { !isStarted ?
        <div>
        </div>
        :   
        <div class="whole-wrap">
            <div class="container box_1170">
                <div className="section-top-border">
                        <h3 className="mb-30">Question No.{question_no}</h3>
                        <div className="row">
                            <div className="col-lg-12">
                                <blockquote className="generic-blockquote">
                                {question}
                                <br/><br/>
                               
                               { 
                               type==="mcq" ?
                               <div> 
                                {  options.map( (option,key) => (
                                    <div className="col-lg-3 col-md-4 mt-sm-30">
                                        <div className="switch-wrap d-flex justify-content-between">
                                        <p>{option}</p>
                                            <div className="primary-checkox" >
                                                <input type="checkbox" id="primary-checkbox"
                                                 checked={answer===option}
                                                 onChange={e=>{
                                                     if(answer!=option)
                                                     {setAnswer(option);}
                                                     else{
                                                         setAnswer(null);
                                                     }
                                                     
                                                     }}/>
                                                <label for="primary-checkbox"></label>
                                            </div>
                                           
                                        </div>
                                    </div>
                                )
                                )
                                } 
                                </div>
                                :
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control valid" name="name" id="name" 
                                        type="number"  
                                        placeholder="Your Answer" value={answer} onChange = {e => setAnswer(e.target.value)} />
                                    </div>
                                </div>
                            }
                                
                                </blockquote>
                            </div>
                        </div>
                    </div>
            </div>
             <blockquote> 
                <section className="button-area">
                    <div>
                        { (move===false && answer===null)?
                        <div className="button-group-area mt-10" style={{paddingtop:"10px",paddingLeft:"50px"}}>
                            <button href="#" onClick={(e)=>{setMove(true)}} className="genric-btn primary-border e-large">Move To Another</button>
                        </div>:<></>
                        }
                                <div> 
                                        { (move || answer!=null)
                                            ?
                                            <div>  
                                                <section className="button-area">
                                                    <div className="container box_1170 border-top-generic">
                                                    <div class="button-group-area mt-10">
                                                    
                                                    {
                                                       Object.keys(userPaperResponse).map((key)=>{
                                                            return(
                                                                <>
                                                                {  userPaperResponse[key] ==="" ?
                                                                <button onClick={e=>{
                                                                    console.log(JSON.stringify({
                                                                        qnID:key,
                                                                        paperID:paperID,
                                                                        lastQnID:question_no,
                                                                        lastAns : answer,
                                                        
                                                                      }))
                                                                    setIsLoading(true);
                                                                    // console.log("key ",key);
                                                                    fetch('https://www.mutualfundcalculator.in/starlord/exam/get_question/',{
                                                                        
                                                                        method : 'POST',
                                                                        headers: {'Content-Type': 'application/json',
                                                                        'Authorization' : 'Bearer ' + accessToken   },
                                                                        body: JSON.stringify({
                                                                            qnID:key,
                                                                            paperID:paperID,
                                                                            lastQnID:question_no,
                                                                            lastAns : answer,
                                                            
                                                                          })
                                                                    })
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
                                                                          setQuestion_no(key);
                                                                          setQuestion(data.question.question);
                                                                        //   setType(data.firstQuestion.qnJSON.type);
                                                                          setPosMark(data.question.posMark);
                                                                          setNegMark(data.question.negMark);
                                                                          setOptions(data.question.options);
                                                                          setStartTime(data.startTime);
                                                                          setAnswer(null);
                                                                          setMove(false);
                                                                          


                                                                          Object.keys(userPaperResponse).map((key)=>{
                                                                            userPaperResponse[key] = "true";
                                                                          })

                                                                          Object.keys(data.userResponse).map((key)=>{
                                                                            userPaperResponse[key] = "";
                                                                          })

                                                                          
                                                                         
                                                                          
                                                                        //   Object.entries(data.userPaperResponse).map(([key, value]) => {
                                                                        //     userResponse.push(value);
                                                                           
                                                                        //     // Pretty straightforward - use key for the key and value for the value.
                                                                        //     // Just to clarify: unlike object destructuring, the parameter names don't matter here.
                                                                        // })
                                                                    })
                                                                      .catch(
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
                                                                }} className="genric-btn danger-border small">{key} </button>
                                                                :
                                                                <button onClick={e=>{
                                                                    console.log(JSON.stringify({
                                                                        qnID:key,
                                                                        paperID:paperID,
                                                                        lastQnID:question_no,
                                                                        lastAns : answer,
                                                        
                                                                      }))
                                                                    setIsLoading(true);
                                                                    // console.log("key ",key);
                                                                    fetch('https://www.mutualfundcalculator.in/starlord/exam/get_question/',{
                                                                        
                                                                        method : 'POST',
                                                                        headers: {'Content-Type': 'application/json',
                                                                        'Authorization' : 'Bearer ' + accessToken   },
                                                                        body: JSON.stringify({
                                                                            qnID:key,
                                                                            paperID:paperID,
                                                                            lastQnID:question_no,
                                                                            lastAns : answer,
                                                            
                                                                          })
                                                                    })
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
                                                                          
                                                                          setQuestion_no(key);
                                                                          setQuestion(data.question.question);
                                                                        //setType(data.firstQuestion.qnJSON.type);
                                                                          setPosMark(data.question.posMark);
                                                                          setNegMark(data.question.negMark);
                                                                          setOptions(data.question.options);
                                                                          setStartTime(data.startTime);
                                                                          setAnswer(null);
                                                                          setMove(false);
                                                                          
                                                                          Object.keys(userPaperResponse).map((key)=>{
                                                                            userPaperResponse[key] = "true";
                                                                          })

                                                                          Object.keys(data.userResponse).map((key)=>{
                                                                            userPaperResponse[key] = "";
                                                                          })
                                                                          
                                                                         
                                                                        //   Object.entries(data.userPaperResponse).map(([key, value]) => {
                                                                        //     userResponse.push(value);
                                                                           
                                                                        //     // Pretty straightforward - use key for the key and value for the value.
                                                                        //     // Just to clarify: unlike object destructuring, the parameter names don't matter here.
                                                                        // })
                                                                           
                                                                            // Pretty straightforward - use key for the key and value for the value.
                                                                            // Just to clarify: unlike object destructuring, the parameter names don't matter here.
                                                                        })
                                                                      .catch(
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
                                                                }} class="genric-btn primary small">{key} </button>
                                                                
                                                                 } 
                                                                 </>
                                                            )
                                                        })
                                                    }
                                                    
                                                    </div>

                                                    

                                                    </div>
                                                </section>
                                            </div>
                                            :<></>
                                        }
                                </div>
                      
                    
                    
                
                        
                        
                    </div>
                </section>
            </blockquote> 
            
        </div>
    
    
    
    
    
    }
    </div>}
    </div>
    );
}

export default AttemptPaper;