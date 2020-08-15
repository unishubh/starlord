import React, { useEffect, useState, useRef, useContext } from "react";
import { useHistory, useParams, Prompt } from "react-router-dom";
import swal from "sweetalert";
import { Next } from "react-bootstrap/PageItem";
import { UserContext } from "../UserContext";
import NavigationPrompt from "react-router-navigation-prompt";
import { Modal } from "react-modal";
import config from "../config";

function AttemptPaper() {
  const history = useHistory();
  const { token, setToken, isExamStarted, setIsExamStarted } = useContext(
    UserContext
  );
  const { paperID, paperName } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [exam_ended, setExam_ended] = useState(false);
  const [isStarted, setIsStarted] = useState(true);
  const accessToken = localStorage.getItem("token");
  const [startTime, setStartTime] = useState(null);
  const [totalQns, setTotalQns] = useState(0);
  const [leftHours, setLeftHours] = useState(null);
  const [leftMins, setLeftMins] = useState(null);
  const [leftSecs, setLeftSecs] = useState(null);
  const [question_no, setQuestion_no] = useState(null);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [posMark, setPosMark] = useState(null);
  const [negMark, setNegMark] = useState(null);
  const [type, setType] = useState(null);
  const [userPaperResponse, setUserPaperResponse] = useState({});
  const [userResponse, setUserResponse] = useState([]);
  const [move, setMove] = useState(false);
  const [duration, setDuration] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [answer, setAnswer] = useState("");
  const [onEndExam, setOnEndExam] = useState(false);

  let interval = useRef();

  const startTimer = () => {
    const finish = endTime;

    interval = setInterval(() => {
      const now = new Date().getTime();
      const dis = finish - now;
      const hours = Math.floor(dis / (1000 * 60 * 60));
      const mins = Math.floor((dis % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((dis % (1000 * 60)) / 1000);

      if (finish != null && dis <= 0 && exam_ended == false) {
        EndExam();
        clearInterval(interval);
        setExam_ended(true);
        // console.log("this is happening");
        setExam_ended(true);
      } else if (dis < 0 && finish != null) {
        clearInterval(interval);
        setLeftHours(0);
        setLeftMins(0);
        setLeftSecs(0);
        swal({
          title: "Already Attempted",
          text: "You have already attempted and time is up ",
          icon: "warning",
          button: "Got it",
        });
      } else {
        if (finish != null) {
          setLeftHours(hours);
          setLeftMins(mins);
          setLeftSecs(secs);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    if (exam_ended == false) {
      startTimer();
    }
    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    if (isStarted == true && exam_ended == false) {
      // console.log("Exam Startes")
      setIsExamStarted(true);
      StartExam();
    }
  }, [isStarted]);

  useEffect(() => {
    if (onEndExam == false && exam_ended == true) {
      EndExam();
    }
  }, [exam_ended]);

  const StartExam = () => {
    // localStorage.setItem("exam",true);

    setIsLoading(true);
    fetch(config.apiUrl + "api/attempt/" + paperID, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        // console.log(response);
        setIsLoading(false);
        if (response.ok) return response.json();
        else {
          // alert(response.status)
          // console.log("yaha cancel hua")
          throw new Error(response.status);
        }
      })
      .then((data) => {
        setIsExamStarted(true);
        // console.log(data);
        setQuestion_no(data.data.firstQuestion.iid);
        setQuestion(data.data.firstQuestion.qnJSON.question);
        setType(data.data.firstQuestion.qnJSON.type);
        setPosMark(data.data.firstQuestion.qnJSON.posMark);
        setNegMark(data.data.firstQuestion.qnJSON.negMark);
        if (data.data.firstQuestion.qnJSON.options)
          setOptions(data.data.firstQuestion.qnJSON.options);

        // console.log("start ",data.startTime);

        // ALL TIMER

        // Duration
        const duration_mili = data.data.duration * 3600000;
        setDuration(duration_mili);

        // start time
        const dt = new Date(data.data.startTime);
        const start_mili = dt.getTime();
        // console.log("start time fetched ",start_mili);
        setStartTime(start_mili);

        // end time
        const finish_mili = start_mili + duration_mili;
        setEndTime(finish_mili);

        // Current Time
        const current_mili = new Date().getTime();

        // console.log(data.startTime);
        // console.log(finish_dt);

        if (current_mili > finish_mili) {
          setExam_ended(true);

          swal({
            title: "Already Attempted",
            text: "You have already attempted and time is up inside",
            icon: "warning",
            button: "Got it",
          });
          history.push("/myattemptedpapers");
        }
        var size = Object.keys(data.data.userPaperResponse.response).length;
        setTotalQns(size);
        // if(size>0)
        setUserPaperResponse(data.data.userPaperResponse.response);
        const key = 1;
        setAnswer(data.data.userPaperResponse.response[key]);

        // ALL TIME THING
        setIsLoading(false);
      })
      .catch((error) => {
        // swal({
        //   title: "Oops",
        //   text: "You have already attempted paper " ,
        //   icon: "warning",
        //   button: "Got it",
        // });
        // setIsExamStarted(false);
        // history.push('/myexams');
        swal({
          title: "Umm",
          text:
            "Either you have already attempted or this paper have no question",
          icon: "warning",
          button: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            setIsExamStarted(false);
            history.push("/myexams");
          }
        });
      });
  };
  const EndExam = () => {
    // console.log("end exam called");
    setOnEndExam(true);
    setIsLoading(true);
    setIsExamStarted(false);
    clearInterval(interval);
    // console.log("key ",key);
    // console.log(JSON.stringify({

    //   paperID:paperID,
    //   lastQnID:question_no,
    //   lastQnAns : answer,

    // }));
    if (answer != "") {
      const key = question_no;
      // console.log("In Another key is ",key)
      // console.log(JSON.stringify({
      //     qnID:key,
      //     paperID:paperID,
      //     lastQnID:question_no,
      //     lastQnAns : answer,

      //   }))
      setIsLoading(true);
      // console.log("key ",key);
      fetch(config.apiUrl + "api/question/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify({
          qnID: key,
          paperID: paperID,
          lastQnID: question_no,
          lastQnAns: answer,
        }),
      })
        .then((response) => {
          // console.log(response);
          setIsLoading(false);
          if (response.ok) return response.json();
          else {
            // alert(response.status)
            throw new Error(response.status);
          }
        })
        .then((data) => {
          // console.log(data);
          setQuestion_no(key);
          setQuestion(data.data.question.question);
          //   setType(data.firstQuestion.qnJSON.type);
          setPosMark(data.data.question.posMark);
          setNegMark(data.data.question.negMark);
          if (data.data.question.options) {
            setOptions(data.data.question.options);
            setType("MCQ");
          } else {
            setType("INT");
          }

          // ALL TIMER

          // Duration
          const duration_mili = data.data.duration * 3600000;
          setDuration(duration_mili);

          // start time
          const dt = new Date(data.data.startTime);
          const start_mili = dt.getTime();
          // console.log("start time fetched ",start_mili);
          setStartTime(start_mili);

          // end time
          const finish_mili = start_mili + duration_mili;
          setEndTime(finish_mili);

          // Current Time
          const current_mili = new Date().getTime();

          // console.log(data.startTime);
          // console.log(finish_dt);

          if (current_mili > finish_mili) {
            setExam_ended(true);
            swal({
              title: "Already Attempted",
              text: "You have already attempted and time is up ",
              icon: "warning",
              button: "Got it",
            });

            history.push("/myattemptedpapers");
          }
          // All Timer

          setMove(false);
          setUserPaperResponse(data.data.userResponse);
          setAnswer(data.data.userResponse[key]);

          // Object.keys(userPaperResponse).map((key)=>{
          //   userPaperResponse[key] = "true";
          // })

          // Object.keys(data.userResponse).map((key)=>{
          //   userPaperResponse[key] = "";
          // })
        })
        .catch((error) => {
          swal({
            title: "Oops",
            text: "Something went wrong " + error,
            icon: "error",
            button: "Got it",
          });
          //   history.push('/');
        });
    }
    fetch(config.apiUrl + "api/paper/end/" + paperID, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        paperID: paperID,
      }),
    })
      .then((response) => {
        // console.log(response);
        setIsLoading(false);
        if (response.ok) return response.json();
        else {
          // alert(response.status)
          throw new Error(response.status);
        }
      })
      .then((data) => {
        // console.log(data);
        swal({
          title: "Well !",
          text: "Exam is ended",
          icon: "success",
          button: "Got it",
        });
        history.push("/");
      })
      .catch((error) => {
        swal({
          title: "Oops",
          text: "You called End Exam " + error,
          icon: "error",
          button: "Got it",
        });
        //   history.push('/');
      });
  };

  useEffect(() => {
    // console.log(answer);
  }, [answer]);

  const AnotherQuestion = (event) => {
    const key = event.target.value;
    // console.log("In Another key is ",key)
    // console.log(JSON.stringify({
    //     qnID:key,
    //     paperID:paperID,
    //     lastQnID:question_no,
    //     lastQnAns : answer,

    //   }))
    setIsLoading(true);
    // console.log("key ",key);
    fetch(config.apiUrl + "api/question/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        qnID: key,
        paperID: paperID,
        lastQnID: question_no,
        lastQnAns: answer,
      }),
    })
      .then((response) => {
        // console.log(response);
        setIsLoading(false);
        if (response.ok) return response.json();
        else {
          // alert(response.status)
          throw new Error(response.status);
        }
      })
      .then((data) => {
        // console.log(data);
        setQuestion_no(key);
        setQuestion(data.data.question.question);
        //   setType(data.firstQuestion.qnJSON.type);
        setPosMark(data.data.question.posMark);
        setNegMark(data.data.question.negMark);
        if (data.data.question.options) {
          setOptions(data.data.question.options);
          setType("MCQ");
        } else {
          setType("INT");
        }

        // ALL TIMER

        // Duration
        const duration_mili = data.data.duration * 3600000;
        setDuration(duration_mili);

        // start time
        const dt = new Date(data.data.startTime);
        const start_mili = dt.getTime();
        // console.log("start time fetched ",start_mili);
        setStartTime(start_mili);

        // end time
        const finish_mili = start_mili + duration_mili;
        setEndTime(finish_mili);

        // Current Time
        const current_mili = new Date().getTime();

        // console.log(data.startTime);
        // console.log(finish_dt);

        if (current_mili > finish_mili) {
          setExam_ended(true);
          swal({
            title: "Already Attempted",
            text: "You have already attempted and time is up ",
            icon: "warning",
            button: "Got it",
          });
        }
        // All Timer

        setMove(false);
        setUserPaperResponse(data.data.userResponse);
        setAnswer(data.data.userResponse[key]);

        // Object.keys(userPaperResponse).map((key)=>{
        //   userPaperResponse[key] = "true";
        // })

        // Object.keys(data.userResponse).map((key)=>{
        //   userPaperResponse[key] = "";
        // })
      })
      .catch((error) => {
        swal({
          title: "Oops",
          text: "Something went wrong " + error,
          icon: "error",
          button: "Got it",
        });
        //   history.push('/');
      });
  };

  useEffect(() => {
    // console.log(isExamStarted)
    return () => {
      // window.removeEventListener('beforeunload')
      clearInterval(interval);
      EndExam();
    };
  }, []);

  //  window.addEventListener('beforeunload',(event)=>{
  //    event.preventDefault();

  //    event.returnValue = "Your Exam will be Ended";
  //  })
  const Hi = () => {
    let f = 0;
    // console.log("hi called")
  };
  // window.addEventListener('beforeunload', (event) => {
  //   // Cancel the event as stated by the standard.

  //   event.preventDefault();
  //   event.returnValue = 'Are You sure ?';
  //   swal({
  //     title: "Are you sure?",
  //     text: "If you leave, your exam will be ended",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   })
  //   .then((willDelete) => {
  //     if (willDelete) {
  //       EndExam();
  //     } else {
  //       swal("Continue with your exam!");
  //     }
  //   });

  // Chrome requires returnValue to be set.
  // EndExam();

  // });
  const onConfirm = () => {
    // console.log("confrim")
  };

  return (
    <div>
      <Prompt
        when={isExamStarted}
        message="Are you sure ? Your Exam will be ended"
      />

      {isLoading ? (
        <div>
          <div className="preloader d-flex align-items-center justify-content-center">
            <div className="preloader-inner position-relative">
              <div className="preloader-circle"></div>
              <div className="preloader-img pere-text">
                <img src="assets/img/logo/loder.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            className="button-group-area mt-10"
            style={{ paddingtop: "10px", paddingLeft: "50px" }}
          >
            {!isStarted ? (
              <></>
            ) : (
              <button onClick={EndExam} class="genric-btn danger-border circle">
                End Exam
              </button>
            )}
          </div>
          <h1 align="center">Paper - {paperName}</h1>
          <h3 align="right" style={{ paddingRight: "20px" }}>
            Time Left - {leftHours} : {leftMins} : {leftSecs}
          </h3>
          {!isStarted ? (
            <div align="center">
              <button
                onClick={StartExam}
                class="genric-btn success-border circle"
              >
                Start Exam
              </button>
            </div>
          ) : (
            <></>
          )}
          {/* {isLoading ?
            <div>isLoading...</div> : <div>PreviewPaper</div> } */}

          {!isStarted ? (
            <div></div>
          ) : (
            <div class="whole-wrap">
              <div class="container box_1170">
                <div className="section-top-border">
                  <h3 className="mb-30">Question No.{question_no}</h3>
                  <p align="right">
                    {" "}
                    Pos Mark : {posMark} &nbsp;&nbsp; Neg Mark : -{negMark}
                  </p>
                  <div className="row">
                    <div className="col-lg-12">
                      <blockquote className="generic-blockquote">
                        {question}
                        <br />
                        <br />

                        {type === "MCQ" ? (
                          <div>
                            {options.map((option, key) => (
                              <div className="col-lg-3 col-md-4 mt-sm-30">
                                <div className="switch-wrap d-flex justify-content-between">
                                  <p>{option}</p>
                                  <div className="primary-checkox">
                                    <input
                                      type="checkbox"
                                      id="primary-checkbox"
                                      checked={answer === option}
                                      onChange={(e) => {
                                        if (answer != option) {
                                          setAnswer(option);
                                        } else {
                                          setAnswer("");
                                        }
                                      }}
                                    />
                                    <label for="primary-checkbox"></label>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <input
                                className="form-control valid"
                                name="name"
                                id="name"
                                type="number"
                                placeholder="Your Answer"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
              <blockquote>
                <section className="button-area">
                  <div>
                    {/* { (move===false && answer===null)?
                        <div className="button-group-area mt-10" style={{paddingtop:"10px",paddingLeft:"50px"}}>
                            <button href="#" onClick={(e)=>{setMove(true)}} 
                            className="genric-btn primary-border e-large">Move To Another</button>
                        </div>:<></>
                        } */}
                    <div>
                      {/* { (move || answer!=null)
                                            ? */}
                      <div>
                        <section className="button-area">
                          <div className="container box_1170 border-top-generic">
                            {Number(question_no) !== 1 ? (
                              <button
                                onClick={AnotherQuestion}
                                value={Number(question_no) - 1}
                                class="genric-btn primary-border"
                              >
                                Prev
                              </button>
                            ) : (
                              <></>
                            )}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {Number(question_no) !== totalQns ? (
                              <button
                                onClick={AnotherQuestion}
                                value={Number(question_no) + 1}
                                class="genric-btn primary-border"
                              >
                                Next
                              </button>
                            ) : (
                              <></>
                            )}
                            <div class="button-group-area mt-10">
                              {Object.keys(userPaperResponse).map((key) => {
                                return (
                                  <>
                                    {userPaperResponse[key] === "" ? (
                                      <button
                                        value={key}
                                        onClick={AnotherQuestion}
                                        className="genric-btn danger-border small"
                                      >
                                        {key}{" "}
                                      </button>
                                    ) : (
                                      <button
                                        value={key}
                                        onClick={AnotherQuestion}
                                        class="genric-btn primary small"
                                      >
                                        {key}{" "}
                                      </button>
                                    )}
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        </section>
                      </div>
                      {/* :<></>
                                        } */}
                    </div>
                  </div>
                </section>
              </blockquote>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AttemptPaper;
