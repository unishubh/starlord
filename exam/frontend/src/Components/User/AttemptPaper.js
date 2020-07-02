import React, { useEffect, useState } from 'react';
import {useHistory,useParams} from 'react-router-dom';
import swal from 'sweetalert';

function AttemptPaper(){
    const history = useHistory();
    const {paperID,paperName} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isStarted,setIsStarted] = useState(false);
    const accessToken = localStorage.getItem("token");
    useEffect(
        () => {

        },[isStarted]
    );
    const StartExam = () =>{
            setIsLoading(true);
            setIsStarted(true);
            fetch('https://www.mutualfundcalculator.in/exam/attempt_paper/'+paperID,{
                method : 'POST',
                headers: {'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + accessToken   },
            })
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
    };
    const EndExam = () => {

    };

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
                        <h3 className="mb-30">Question No.</h3>
                        <div className="row">
                            <div className="col-lg-12">
                                <blockquote className="generic-blockquote">
                                    “Recently, the US Federal government banned online casinos from operating in America by
                                    making it illegal to
                                    transfer money to them through any US bank or payment system. As a result of this law, most
                                    of the popular
                                    online casino networks such as Party Gaming and PlayTech left the United States. Overnight,
                                    online casino
                                    players found themselves being chased by the Federal government. But, after a fortnight, the
                                    online casino
                                    industry came up with a solution and new online casinos started taking root. These began to
                                    operate under a
                                    different business umbrella, and by doing that, rendered the transfer of money to and from
                                    them legal. A major
                                    part of this was enlisting electronic banking systems that would accept this new
                                    clarification and start doing
                                    business with me. Listed in this article are the electronic banking”
                                <br/><br/>
                                <div className="col-lg-3 col-md-4 mt-sm-30">
                                    <div className="switch-wrap d-flex justify-content-between">
                                        <div className="primary-checkox" >
                                            <input type="checkbox" id="primary-checkbox" checked={true}/>
                                            <label for="primary-checkbox"></label>
                                        </div>
                                        <p>02. Primary Color radio</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 mt-sm-30">
                                    <div className="switch-wrap d-flex justify-content-between">
                                        <div className="primary-checkox" >
                                            <input type="checkbox" id="primary-checkbox" checked={false}/>
                                            <label for="primary-checkbox"></label>
                                        </div>
                                        <p>02. Primary Color radio</p>
                                    </div>
                                </div>
                                </blockquote>
                            </div>
                        </div>
                    </div>
            </div>
        </div>}
    </div>}
    </div>
    );
}

export default AttemptPaper;