/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useContext } from 'react';
import { useHistory, useParams, Prompt } from 'react-router-dom';
import swal from 'sweetalert';
// import { Next } from 'react-bootstrap/PageItem';
// import NavigationPrompt from 'react-router-navigation-prompt';
// import { Modal } from 'react-modal';
import { UserContext } from '../UserContext';
import config from '../config';

function AttemptPaper() {
  const history = useHistory();
  const { isExamStarted, setIsExamStarted } = useContext(UserContext);
  const { paperID, paperName } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [examEnded, setExamEnded] = useState(false);
  const [isStarted] = useState(true);
  const accessToken = localStorage.getItem('token');
  const [_startTime, setStartTime] = useState(null);
  const [totalQns, setTotalQns] = useState(0);
  const [leftHours, setLeftHours] = useState(null);
  const [leftMins, setLeftMins] = useState(null);
  const [leftSecs, setLeftSecs] = useState(null);
  const [questionNo, setQuestionNo] = useState(null);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [posMark, setPosMark] = useState(null);
  const [negMark, setNegMark] = useState(null);
  const [type, setType] = useState(null);
  const [userPaperResponse, setUserPaperResponse] = useState({});
  // const [userResponse, setUserResponse] = useState([]);
  const [move, setMove] = useState(false);
  const [duration, setDuration] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [answer, setAnswer] = useState('');
  const [onEndExam, setOnEndExam] = useState(false);

  let interval = useRef();

  const StartExam = () => {
    // localStorage.setItem("exam",true);

    setIsLoading(true);
    fetch(`${config.apiUrl}api/attempt/${paperID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        // console.log(response);
        setIsLoading(false);
        if (response.ok) return response.json();

        // alert(response.status)
        // console.log("yaha cancel hua")
        throw new Error(response.status);
      })
      .then((data) => {
        setIsExamStarted(true);
        // console.log(data);
        setQuestionNo(data.data.firstQuestion.iid);
        setQuestion(data.data.firstQuestion.qnJSON.question);
        setType(data.data.firstQuestion.qnJSON.type);
        setPosMark(data.data.firstQuestion.qnJSON.posMark);
        setNegMark(data.data.firstQuestion.qnJSON.negMark);
        if (data.data.firstQuestion.qnJSON.options) setOptions(data.data.firstQuestion.qnJSON.options);

        // console.log("start ",data.startTime);

        // ALL TIMER

        // Duration
        const durationMili = data.data.duration * 3600000;
        setDuration(durationMili);

        // start time
        const dt = new Date(data.data.startTime);
        const startMili = dt.getTime();
        // console.log("start time fetched ",start_mili);
        setStartTime(startMili);

        // end time
        const finishMili = startMili + durationMili;
        setEndTime(finishMili);

        // Current Time
        const currentMili = new Date().getTime();

        // console.log(data.startTime);
        // console.log(finish_dt);

        if (currentMili > finishMili) {
          setExamEnded(true);

          swal({
            title: 'Already Attempted',
            text: 'You have already attempted and time is up inside',
            icon: 'warning',
            button: 'Got it',
          });
          history.push('/myattemptedpapers');
        }
        const size = Object.keys(data.data.userPaperResponse.response).length;
        setTotalQns(size);
        // if(size>0)
        setUserPaperResponse(data.data.userPaperResponse.response);
        const key = 1;
        setAnswer(data.data.userPaperResponse.response[key]);

        // ALL TIME THING
        setIsLoading(false);
      })
      .catch(() => {
        // swal({
        //   title: "Oops",
        //   text: "You have already attempted paper " ,
        //   icon: "warning",
        //   button: "Got it",
        // });
        // setIsExamStarted(false);
        // history.push('/myexams');
        swal({
          title: 'Umm',
          text: 'Either you have already attempted or this paper have no question',
          icon: 'warning',
          button: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            setIsExamStarted(false);
            history.push('/myexams');
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
    // hitting the question api again to save the answer of last question, not good way, just a hack.
    if (answer !== '') {
      const key = questionNo;
      setIsLoading(true);
      fetch(`${config.apiUrl}api/question/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          qnID: key,
          paperID,
          lastQnID: questionNo,
          lastQnAns: answer,
        }),
      })
        .then((response) => {
          setIsLoading(false);
          if (response.ok) return response.json();
          throw new Error(response.status);
        })
        .then((data) => {
          setQuestionNo(key);
          setQuestion(data.data.question.question);
          //   setType(data.firstQuestion.qnJSON.type);
          setPosMark(data.data.question.posMark);
          setNegMark(data.data.question.negMark);
          if (data.data.question.options) {
            setOptions(data.data.question.options);
            setType('MCQ');
          } else {
            setType('INT');
          }

          // ALL TIMER

          // Duration
          // const durationMili = data.data.duration * 3600000;
          // setDuration(durationMili);
          //
          // // start time
          // const dt = new Date(data.data.startTime);
          // const startMili = dt.getTime();
          // // console.log("start time fetched ",start_mili);
          // setStartTime(startMili);

          // end time
          // const finishMili = startMili + durationMili;
          // setEndTime(finishMili);
          //
          // // Current Time
          // const currentMili = new Date().getTime();
          // if (currentMili > finishMili) {
          //   setExamEnded(true);
          //   swal({
          //     title: 'Already Attempted',
          //     text: 'You have already attempted and time is up ',
          //     icon: 'warning',
          //     button: 'Got it',
          //   });
          //
          //   history.push('/myattemptedpapers');
          // }
          // All Timer

          // setMove(false);
          // setUserPaperResponse(data.data.userResponse);
          // setAnswer(data.data.userResponse[key]);
        })
        .catch((error) => {
          swal({
            title: 'Oops',
            text: `Something went wrong ${error}`,
            icon: 'error',
            button: 'Got it',
          });
          //   history.push('/');
        });
    }
    fetch(`${config.apiUrl}api/paper/end/${paperID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        paperID,
      }),
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) return response.json();

        // alert(response.status)
        throw new Error(response.status);
      })
      .then((data) => {
        console.log(data);
        swal({
          title: 'Exam Ended',
          text: `Marks Scored : ${data.data.totalMarks}`,
          icon: 'success',
          button: 'Got it',
        }).then(history.push(`/result/${paperID}/${paperName}`));
      })
      .catch((error) => {
        swal({
          title: 'Oops',
          text: `You called End Exam ${error}`,
          icon: 'error',
          button: 'Got it',
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
    fetch(`${config.apiUrl}api/question/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        qnID: key,
        paperID,
        lastQnID: questionNo,
        lastQnAns: answer,
      }),
    })
      .then((response) => {
        // console.log(response);
        setIsLoading(false);
        if (response.ok) return response.json();

        // alert(response.status)
        throw new Error(response.status);
      })
      .then((data) => {
        setQuestionNo(key);
        setQuestion(data.data.question.question);
        //   setType(data.firstQuestion.qnJSON.type);
        setPosMark(data.data.question.posMark);
        setNegMark(data.data.question.negMark);
        if (data.data.question.options) {
          setOptions(data.data.question.options);
          setType('MCQ');
        } else {
          setType('INT');
        }

        // ALL TIMER

        // Duration
        const durationMili = data.data.duration * 3600000;
        setDuration(durationMili);

        // start time
        const dt = new Date(data.data.startTime);
        const startMili = dt.getTime();
        // console.log("start time fetched ",start_mili);
        setStartTime(startMili);

        // end time
        const finishMili = startMili + durationMili;
        setEndTime(finishMili);

        // Current Time
        const currentMili = new Date().getTime();

        if (currentMili > finishMili) {
          setExamEnded(true);
          swal({
            title: 'Already Attempted',
            text: 'You have already attempted and time is up ',
            icon: 'warning',
            button: 'Got it',
          });
        }
        // All Timer

        setMove(false);
        setUserPaperResponse(data.data.userResponse);
        setAnswer(data.data.userResponse[key]);
      })
      .catch((error) => {
        swal({
          title: 'Oops',
          text: `Something went wrong ${error}`,
          icon: 'error',
          button: 'Got it',
        });
        //   history.push('/');
      });
  };

  useEffect(
    () =>
      // console.log(isExamStarted)
      () => {
        // window.removeEventListener('beforeunload')
        clearInterval(interval);
        EndExam();
      },
    []
  );

  const startTimer = () => {
    const finish = endTime;

    interval = setInterval(() => {
      const now = new Date().getTime();
      const dis = finish - now;
      const hours = Math.floor(dis / (1000 * 60 * 60));
      const mins = Math.floor((dis % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((dis % (1000 * 60)) / 1000);

      if (finish !== null && dis <= 0 && examEnded === false) {
        EndExam();
        clearInterval(interval);
        setExamEnded(true);
        // console.log("this is happening");
        setExamEnded(true);
      } else if (dis < 0 && finish !== null) {
        clearInterval(interval);
        setLeftHours(0);
        setLeftMins(0);
        setLeftSecs(0);
        swal({
          title: 'Already Attempted',
          text: 'You have already attempted and time is up ',
          icon: 'warning',
          button: 'Got it',
        });
      } else if (finish !== null) {
        setLeftHours(hours);
        setLeftMins(mins);
        setLeftSecs(secs);
      }
    }, 1000);
  };

  useEffect(() => {
    if (examEnded === false) {
      startTimer();
    }
    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    if (isStarted === true && examEnded === false) {
      // console.log("Exam Startes")
      setIsExamStarted(true);
      StartExam();
    }
  }, [isStarted]);

  useEffect(() => {
    if (onEndExam === false && examEnded === true) {
      EndExam();
    }
  }, [examEnded]);

  return (
    <div>
      <Prompt when={isExamStarted} message="Are you sure ? Your Exam will be ended" />

      {isLoading ? (
        <div>
          <div className="preloader d-flex align-items-center justify-content-center">
            <div className="preloader-inner position-relative">
              <div className="preloader-circle" />
              <div className="preloader-img pere-text">
                <img src="assets/img/logo/loder.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="button-group-area mt-10" style={{ paddingtop: '10px', paddingLeft: '50px' }}>
            {!isStarted ? (
              <></>
            ) : (
              <button type="button" onClick={EndExam} className="genric-btn danger-border circle">
                Submit Exam
              </button>
            )}
          </div>
          <h1 align="center">Paper -{paperName}</h1>
          <h3 align="right" style={{ paddingRight: '20px' }}>
            Time Left -{leftHours} :{leftMins} :{leftSecs}
          </h3>
          {!isStarted ? (
            <div align="center">
              <button type="button" onClick={StartExam} className="genric-btn success-border circle">
                Start Exam
              </button>
            </div>
          ) : (
            <></>
          )}
          {/* {isLoading ?
            <div>isLoading...</div> : <div>PreviewPaper</div> } */}

          {!isStarted ? (
            <div />
          ) : (
            <div className="whole-wrap">
              <div className="container box_1170">
                <div className="section-top-border">
                  <h3 className="mb-30">
                    Question No.
                    {questionNo}
                  </h3>
                  <p align="right">
                    {' '}
                    Pos Mark :{posMark} &nbsp;&nbsp; Neg Mark : -{negMark}
                  </p>
                  <div className="row">
                    <div className="col-lg-12">
                      <blockquote className="generic-blockquote">
                        {question}
                        <br />
                        <br />

                        {type === 'MCQ' ? (
                          <div>
                            {options.map((option) => (
                              <div className="col-lg-3 col-md-4 mt-sm-30">
                                <div className="switch-wrap d-flex justify-content-between">
                                  <p>{option}</p>
                                  <div className="primary-checkox">
                                    <input
                                      type="checkbox"
                                      id="primary-checkbox"
                                      checked={answer === option}
                                      onChange={() => {
                                        if (answer !== option) {
                                          setAnswer(option);
                                        } else {
                                          setAnswer('');
                                        }
                                      }}
                                    />
                                    <label htmlFor="primary-checkbox" />
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
                            {Number(questionNo) !== 1 ? (
                              <button
                                type="button"
                                onClick={AnotherQuestion}
                                value={Number(questionNo) - 1}
                                className="genric-btn primary-border"
                              >
                                Prev
                              </button>
                            ) : (
                              <></>
                            )}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {Number(questionNo) !== totalQns ? (
                              <button
                                type="button"
                                onClick={AnotherQuestion}
                                value={Number(questionNo) + 1}
                                className="genric-btn primary-border"
                              >
                                Next
                              </button>
                            ) : (
                              <></>
                            )}
                            <div className="button-group-area mt-10">
                              {Object.keys(userPaperResponse).map((key) => (
                                <>
                                  {userPaperResponse[key] === '' ? (
                                    <button
                                      type="button"
                                      value={key}
                                      onClick={AnotherQuestion}
                                      className="genric-btn danger-border small"
                                    >
                                      {key}
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      value={key}
                                      onClick={AnotherQuestion}
                                      className="genric-btn primary small"
                                    >
                                      {key}
                                    </button>
                                  )}
                                </>
                              ))}
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
