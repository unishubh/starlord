import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Select from 'react-select';
import AsyncSelect from 'react-select';
import config from '../config';

function AddQestion() {
  const types = [
    { value: 'MCQ', label: 'MCQ' },
    { value: 'INT', label: 'INTEGER' },
  ];
  const { paperID } = useParams();
  // console.log("Add Question PE aagye");
  // console.log(paperid);
  // const [questions,setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [optionsfake, setOptionsfake] = useState([]);
  const [option, setOption] = useState('');
  // const [option1,setOption1] = useState("");
  // const [option2,setOption2] = useState("");
  // const [option3,setOption3] = useState("");
  // const [option4,setOption4] = useState("");
  const [correct, setCorrect] = useState(null);
  const [type, setType] = useState('');
  const [posMark, setPosMark] = useState(null);
  const [negMark, setNegMark] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const [questionError, setQuestionError] = useState('');
  const [optionsError, setOptionsError] = useState('');
  const [correctError, setCorrectError] = useState('');
  const [posMarkError, setPosMarkError] = useState('');
  const [negMarkError, setNegMarkError] = useState('');
  const [isAllowed, setAllowance] = useState(true);
  const [typeError, setTypeError] = useState('');
  const [count, setCount] = useState(-1);
  const [finishAddQuestion, setFinishAddQuestion] = useState(false);

  useEffect(
    () => {
      // console.log(options);
      // console.log(optionsfake);
      setCount((c) => c + 1);

      let f = 0;
      if (question === '' || question == null) {
        setQuestionError('Write a question');
        f = 1;
      } else {
        setQuestionError('');
      }
      if (type === 'MCQ' && options.length <= 1) {
        setOptionsError('Please provide atleast 2 options');
        f = 1;
      } else {
        setOptionsError('');
      }
      if (correct === '' || correct == null) {
        setCorrectError('Choose a correct option');
        if (type === 'INT') setCorrectError('write the INT value');
        f = 1;
      } else {
        setCorrectError('');
      }
      if (type === '') {
        setTypeError('Choose a correct option');
        f = 1;
      } else {
        setTypeError('');
      }
      if (isNaN(posMark) || Number(posMark) <= 0) {
        setPosMarkError('Provide a Pos number');
        f = 1;
      } else {
        setPosMarkError('');
      }
      if (isNaN(negMark) || Number(negMark) < 0) {
        setNegMarkError('Provide a Pos number');
        f = 1;
      } else {
        setNegMarkError('');
      }
      if (type == 'MCQ') {
        let found = 0;
        for (let index = 0; index < options.length; index++) {
          if (options[index] == correct) {
            found = 1;
            break;
          }
        }
        if (found == 0) {
          setCorrectError('Select Correct Answer from options');
          f = 1;
        } else {
          setCorrectError('');
        }
      } else if (correct == null || isNaN(correct)) {
        setCorrectError('write the INT value');
        f = 1;
      } else {
        setCorrectError('');
      }
    }, [question, type, correct, options, posMark, negMark, option, optionsfake],
  );

  const fetcher = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const resp = await fetch(`${config.apiUrl}api/getQuestionNumbers/${paperID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await resp.json();
      if (data.data.maxQuestions <= data.data.currentQuestions) {
        swal({
          title: 'Oops',
          text: 'Maximum Questions filled',
          icon: 'error',
          button: 'Got it',
        }).then(
          history.push('/'),
        );
      }
      // setAllowance(!(data.data.maxQuestions === data.data.currentQuestions));
      // { console.log(data.data, isAllowed); }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(
    () => {
      fetcher();
    }, [],
  );
  const Validate = () => {
    let f = 0;
    if (question == '' || question == null) {
      setQuestionError('Write a question');
      f = 1;
    } else {
      setQuestionError('');
    }
    if (type == 'MCQ' && options.length <= 1) {
      setOptionsError('Please provide atleast 2 options');
      f = 1;
    } else {
      setOptionsError('');
    }
    if (correct == '' || correct == null) {
      setCorrectError('Choose a correct option');
      if (type == 'INT') setCorrectError('write the INT value');
      f = 1;
    } else {
      setCorrectError('');
    }
    if (type == '') {
      setTypeError('Choose a correct option');
      f = 1;
    } else {
      setTypeError('');
    }
    if (isNaN(posMark) || Number(posMark) <= 0) {
      setPosMarkError('Provide a Pos number');
      f = 1;
    } else {
      setPosMarkError('');
    }
    if (isNaN(negMark) || Number(negMark) < 0) {
      setNegMarkError('Provide a Pos number');
      f = 1;
    } else {
      // console.log(isNaN(negMark))
      // console.log(Number(negMark))
      setNegMarkError('');
    }
    if (type == 'MCQ') {
      let found = 0;
      for (let index = 0; index < options.length; index++) {
        if (options[index] == correct) {
          found = 1;
          break;
        }
      }
      if (found == 0) {
        setCorrectError('Select Correct Answer from options');
        f = 1;
      } else {
        setCorrectError('');
      }
    } else if (correct == null || isNaN(correct)) {
      setCorrectError('write the INT value');
      f = 1;
    } else {
      setCorrectError('');
    }

    // console.log(type)
    if (f == 1) return false;
    return true;
  };
  const handleSubmit = (event) => {
    // console.log(question);
    event.preventDefault();
    setIsLoading(true);

    // questions.push({question,option1,option2,option3,option4,correct});
    // setCorrect("");
    // setOption1("");
    // setOption2("");
    // setOption3("");
    // setOption4("");
    // setQuestion("");
    history.push(`/preview/${paperID}`);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    setCount(1);
    const isValid = Validate();
    if (isValid) {
      setIsLoading(true);
      // console.log("/sjgjs/"+paperID);
      // console.log("add question");
      let bodydata;
      if (type === 'INT') {
        bodydata = JSON.stringify({
          question,
          correctAns: correct,
          type,
          posMark,
          negMark,
        });
      } else {
        bodydata = JSON.stringify({
          question,
          options,
          correctAns: correct,
          type,
          posMark,
          negMark,
        });
      }
      setCorrect(null);
      setOptions([]);
      setOptionsfake([]);
      setQuestion(null);
      setPosMark(null);
      setNegMark(null);
      setCount(-1);
      setFinishAddQuestion(false);
      // console.log(bodydata);
      const accessToken = localStorage.getItem('token');
      fetch(`${config.apiUrl}api/question/${paperID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: bodydata,
      })
        .then((response) => {
          setIsLoading(false);
          if (response.ok) return response.json();

          throw new Error(response.status);
        })
        .then((data) => {
        // console.log("reply",data);

          swal({
            title: 'Hayy',
            text: 'Question Has Been Added Successfully! ',
            icon: 'success',
            button: 'Got it',
          }).then(
            history.go(0),
          );
        }).catch(
          (error) => {
            if (error == 403) {
              swal({
                title: 'Oh Ohhh',
                text: 'Please Login Again',
                icon: 'warn',
                button: 'Got it',
              });
              history.push('/signin');
            } else {
              swal({
                title: 'Oops',
                text: `Something went wrong ${error}`,
                icon: 'error',
                button: 'Got it',
              });
            }
          },
        );
    }
  };

  return (
    <div>

      {
        // eslint-disable-next-line no-nested-ternary
    isLoading
      ? (
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
      )
      : (
        !isAllowed
          ? swal({
            title: 'Oops',
            text: 'Maximum Questions filled',
            icon: 'error',
            button: 'Got it',
          }) : (
            <section className="contact-section">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className=" mt-3">
                      <button
                        className="button button-contactForm boxed-btn"
                        onClick={handleSubmit}
                      >
                        Preview Papaer
                      </button>
                                &nbsp;&nbsp;
                      <button
                        className="button button-contactForm boxed-btn"
                        onClick={(e) => { history.push('/'); }}
                      >
                        Finish
                      </button>
                    </div>
                    <br />
                    <h1 className="contact-title"> Add Question </h1>

                    {/* <h2 className="contact-title"> Total Questions to be added : {questions.length}</h2> */}
                  </div>
                  <div className="col-lg-8">
                    <form className="form-contact contact_form">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <Select
                              placeholder="Select Type of Question"
                              onChange={(e) => setType(e.value)}
                              options={types}
                            />
                            { count <= 0 ? <></> : (
                              <div style={{ fontSize: 12, color: 'red' }}>
                                {typeError}
                              </div>
                            )}
                            {/* <textarea className="form-control w-100" name="message" id="message" cols="30" rows="9" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Message'" placeholder=" Enter Message"></textarea> */}
                          </div>
                        </div>

                        {/* </div> */}
                        <div className="col-12">
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              cols="30"
                              rows="9"
                              name="question"
                              type="text"
                              placeholder="Enter Question"
                              value={question}
                              onChange={(e) => setQuestion(e.target.value)}
                            />
                            { count <= 0 ? <></> : (
                              <div style={{ fontSize: 12, color: 'red' }}>
                                {questionError}
                              </div>
                            )}
                          </div>
                        </div>
                        { type !== 'INT' && finishAddQuestion === false
                          ? (
                            <>
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <input
                                    className="form-control"
                                    name="option"
                                    type="text"
                                    placeholder="Enter Option"
                                    value={option}
                                    onChange={(e) => setOption(e.target.value)}
                                  />
                                  <div className="button-group-area mt-10">
                                    { count <= 0 ? <></> : (
                                      <div style={{ fontSize: 12, color: 'red' }}>
                                        {optionsError}
                                      </div>
                                    )}
                                    <button
                                      className="genric-btn primary-border small"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if (option != '') {
                                          options.push(option);
                                          optionsfake.push({ value: option, label: option });
                                        } else {
                                          setCount(1);
                                          setOptionsError("Option Can't be null");
                                        }
                                        // console.log(optionsfake);
                                        setOption('');
                                      }}
                                    >
                                      Add Option
                                    </button>
                                    <button
                                      className="genric-btn primary-border small"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if (options.length >= 2) setFinishAddQuestion(true);
                                        else {
                                          setOptionsError('Please provide atleast 2 options');
                                        }
                                      }}
                                    >
                                      Finish Add Option
                                    </button>
                                  </div>
                                </div>

                              </div>

                            </>
                          ) : <></>}
                        <div className="col-sm-6">
                          { type === 'INT' ? (
                            <div className="form-group">
                              <input
                                className="form-control"
                                name="correct"
                                type="text"
                                placeholder="Enter Correct Answer"
                                value={correct}
                                onChange={(e) => setCorrect(e.target.value)}
                              />
                              { count <= 0 ? <></> : (
                                <div style={{ fontSize: 12, color: 'red' }}>
                                  {correctError}
                                </div>
                              )}
                            </div>
                          ) : <></> }

                          {type === 'MCQ' && finishAddQuestion === true
                            ? (
                              <>
                                <Select
                                  onChange={(e) => setCorrect(e.value)}
                                  options={optionsfake}
                                  placeholder="select correct option"
                                />
                                { count <= 0 ? <div /> : (
                                  <div style={{ fontSize: 12, color: 'red' }}>
                                    {correctError}
                                  </div>
                                )}

                              </>
                            )
                            : <></>}
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              className="form-control"
                              name="posMark"
                              type="text"
                              placeholder="Postive Mark"
                              value={posMark}
                              onChange={(e) => { setPosMark(e.target.value); }}
                            />
                            { count <= 0 ? <></> : (
                              <div style={{ fontSize: 12, color: 'red' }}>
                                {posMarkError}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              className="form-control"
                              name="negMark"
                              type="text"
                              placeholder="Negative Mark"
                              value={negMark}
                              onChange={(e) => setNegMark(e.target.value)}
                            />
                            { count <= 0 ? <></> : (
                              <div style={{ fontSize: 12, color: 'red' }}>
                                {negMarkError}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* <div className="col-sm-6">
                                    <div className="form-group">
                                        <select className="form-control"  name="type"
                                        placeholder="Enter Type" value={type} onChange = {e => {setType(e.target.value);console.log(e.target.value)}}>
                                        <option value="MCQ" selected>MCQ</option>
                                        <option value="INT">INT</option>
                                        </select>

                                    </div> */}
                        {/* </div>  */}

                      </div>
                      <div className=" mt-3">
                        <button
                          className="button button-contactForm boxed-btn"
                          onClick={handleAdd}
                        >
                          Add
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          ))

            }

    </div>
  );
}

export default AddQestion;
