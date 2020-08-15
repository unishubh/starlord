import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { UserContext } from "../UserContext";
import config from "../config";

function CreateExam() {
  const { token, setToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [maxMarks, setMaxMarks] = useState(null);
  const [details, setDetails] = useState("");
  const [time, setTime] = useState(null);
  const [passMarks, setPassMarks] = useState(null);
  const history = useHistory();
  const [nameError, setNameError] = useState("");
  const [maxMarksError, setMaxMarksError] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [passMarksError, setPassMarksError] = useState("");
  const [count, setCount] = useState(-1);

  // useEffect(
  //   () => {

  //     console.log("USEEFFECT called isagency");
  //     setAgencies([{ value: '', label: 'ALLEN' },
  //     { value: '', label: 'FIITJEE' }])
  //   },[isagency]
  // );
  // useEffect(()=>{console.log(agencies)},[agencies]);

  useEffect(() => {
    setCount((c) => c + 1);

    let f = 0;
    if (name == "") {
      setNameError("Write Exam Name");
      f = 1;
    } else {
      setNameError("");
    }
    if (isNaN(maxMarks) || Number(maxMarks) < 1) {
      setMaxMarksError("Please Provide Marks");
      f = 1;
    } else {
      setMaxMarksError("");
    }
    if (
      isNaN(passMarks) ||
      Number(passMarks) == 0 ||
      Number(maxMarks) < Number(passMarks)
    ) {
      //  console.log(isNaN(passMarks))
      setPassMarksError("Passing marks should not be greater than maxMarks");
      f = 1;
    } else {
      // console.log(isNaN(passMarks))
      setPassMarksError("");
    }
    if (details == "") {
      setDetailsError("Please provide details");
      f = 1;
    } else {
      setDetailsError("");
    }
    if (isNaN(time) || Number(time) <= 0) {
      setTimeError("Enter valid time");
      f = 1;
    } else {
      setTimeError("");
    }
  }, [name, maxMarks, details, time, passMarks]);

  const Validate = () => {
    let f = 0;
    if (name == "") {
      setNameError("Write Exam Name");
      f = 1;
    } else {
      setNameError("");
    }
    if (isNaN(maxMarks) || Number(maxMarks) < 1) {
      setMaxMarksError("Please Provide Marks");
      f = 1;
    } else {
      setMaxMarksError("");
    }
    if (isNaN(passMarks) || Number(maxMarks) < Number(passMarks)) {
      //  console.log(isNaN(passMarks))
      setPassMarksError("Passing marks should not be greater than maxMarks");
      f = 1;
    } else {
      // console.log(isNaN(passMarks))
      setPassMarksError("");
    }
    if (details == "") {
      setDetailsError("Please provide details");
      f = 1;
    } else {
      setDetailsError("");
    }
    if (isNaN(time) || Number(time) <= 0) {
      setTimeError("Enter valid time");
      f = 1;
    } else {
      setTimeError("");
    }
    if (f == 1) return false;
    return true;
  };
  // Submission Start Here//
  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = Validate();
    setCount(1);
    // console.log(isValid)
    if (isValid) {
      // console.log("create exam");
      setIsLoading(true);

      //  console.log(name);
      //  console.log(maxMarks);
      //  console.log(time);

      const accessToken = localStorage.getItem("token");
      fetch(config.apiUrl + "api/exams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify({
          agencyID: token.agencyID,
          name: name,
          maxMarks: maxMarks,
          details: details,
          time: time,
          passMarks: passMarks,
        }),
      })
        .then((response) => {
          setIsLoading(false);
          if (response.ok) return response.json();
          else {
            throw new Error(response.status);
          }
        })
        .then((data) => {
          // console.log(data);
          // console.log(data.message);
          swal({
            title: "Hey Yaayy !!",
            text: "Exam Has Been Created",
            icon: "success",
            button: "Got it",
          });
          history.push("/createpaper");
        })
        .catch((error) => {
          if (error == 403) {
            swal({
              title: "Oh Ohhh",
              text: "Please Login Again",
              icon: "warn",
              button: "Got it",
            });
            history.push("/signin");
          } else {
            swal({
              title: "Oh Ohhh",
              text: "Check your details",
              icon: "error",
              button: "Got it",
            });
          }
        });
      // console.log("Exam Done");
    }
  };

  // Submission Ends Here
  return (
    <div>
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
        <section className="contact-section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="contact-title">Create Exam</h2>
              </div>
              <div className="col-lg-8">
                <form
                  className="form-contact contact_form"
                  id="contactForm"
                  novalidate="novalidate"
                >
                  <div className="row">
                    {/* <div class="col-12">
                                    <div class="form-group">
                                        <textarea className="form-control w-100" name="message" id="message" cols="30" rows="9" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Message'" placeholder=" Enter Message"></textarea>
                                    </div>
                                </div> */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          id="message"
                          placeholder="Enter exam name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        {count <= 0 ? (
                          <></>
                        ) : (
                          <div style={{ fontSize: 12, color: "red" }}>
                            {nameError}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Maximum Marks"
                          value={maxMarks}
                          onChange={(e) => setMaxMarks(e.target.value)}
                        />
                        {count <= 0 ? (
                          <></>
                        ) : (
                          <div style={{ fontSize: 12, color: "red" }}>
                            {maxMarksError}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Passing Marks"
                          value={passMarks}
                          onChange={(e) => setPassMarks(e.target.value)}
                        />
                        {count <= 0 ? (
                          <></>
                        ) : (
                          <div style={{ fontSize: 12, color: "red" }}>
                            {passMarksError}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Time Limit In Hours"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                        {count <= 0 ? (
                          <></>
                        ) : (
                          <div style={{ fontSize: 12, color: "red" }}>
                            {timeError}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          cols="30"
                          rows="9"
                          name="description"
                          type="text"
                          placeholder="Enter Details"
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                        />
                        {count <= 0 ? (
                          <></>
                        ) : (
                          <div style={{ fontSize: 12, color: "red" }}>
                            {detailsError}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <button
                      type="submit"
                      className="button button-contactForm boxed-btn"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default CreateExam;
