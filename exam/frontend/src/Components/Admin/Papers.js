import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Select from 'react-select';
import { UserContext } from '../UserContext';
import config from '../config';

function Papers() {
  const { token, setToken } = useContext(UserContext);
  const [options, setOptions] = useState([]);
  const [examID, setExamID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [examName, setExamName] = useState('');
  const [papers, setPapers] = useState([]);
  const [papercount, setPapercount] = useState(null);
  const accessToken = localStorage.getItem('token');
  const history = useHistory();
  useEffect(() => {
    fetch(`${config.apiUrl}api/exam/byAgency/`, {
      method: 'GET',
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
        throw new Error(response.status);
      })
      .then((data) => {
        // console.log(data);
        let f = 0;
        data.data.examdata.map((exam, key) => {
          options.push({ value: exam.id, label: exam.name });
          if (f == 0) {
            setExamID(exam.id);
            setExamName(exam.name);
            f = 1;
          }
        });

        setIsLoading(false);
      })
      .catch((error) => {
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
        //   history.push('/');
      });

    // console.log(options);
  }, []);
  useEffect(() => {
    // console.log("it started fetching  ",examID);
    setIsLoading(true);

    // console.log("token.role",token.role);
    const accessToken = localStorage.getItem('token');
    // console.log("role is  ", token.role)
    // console.log("token " , accessToken);
    fetch(`${config.apiUrl}api/paper/exam/${examID}`, {
      // mode : 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        setIsLoading(false);
        // console.log(response);
        if (response.status == 200) return response.json();

        // alert(response.status)
        throw new Error(response.status);
      })
      .then((data) => {
        // console.log(data);

        setPapers(data.paperdata);
        setPapercount(data.papercount);
        setIsLoading(false);
      })
      .catch((error) => {
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
            text: 'Something went wrong ',
            icon: 'error',
            button: 'Got it',
          });
        }
        //   history.push('/');
      });
  }, [examID]);
  return (
    <div>
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
          <div className="slider-area">
            <div className="slider-height2 d-flex align-items-center">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="hero-cap hero-cap2 text-center">
                      <h2>
                        Your Papers :
{papercount}
                      </h2>
                      <button
                        onClick={(e) => history.push('/')}
                        className="btn hero-btn"
                        data-animation="fadeInLeft"
                        data-delay=".8s"
                      >
                        Home
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="col-sm-6">
            <h3>Choose Exam</h3>
            <Select
              onChange={(e) => {
                setExamID(e.value);
                setExamName(e.label);
              }}
              options={options}
              placeholder={examName}
            />
          </div>
          <div className="about-details section-padding10" />

          <div className="row">
            {papers.map((paper, key) => (
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div style={{ padding: '40px' }}>
                  <div className="my-own-card">
                    <div className="my-own-name">
                      <div className="hero-cap hero-cap2 text-center">
                        <h3 style={{ color: 'white' }}> 
{' '}
{paper.name}
{' '}
 </h3>
                      </div>
                    </div>
                    <div className="my-own-container">
                      <h5>
                        <b>
                          Total Qns :
{paper.totalQns}
                        </b>
                      </h5>

                      {token.role == 1 ? (
                        <>
                          <div className="button-group-area mt-10">
                            <Link to={`/addquestion/${paper.id}`} className="genric-btn primary-border small">
                              Add Question
                            </Link>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <br /> 
{' '}
<br /> 
{' '}
<br />
    </div>
  );
}

export default Papers;
