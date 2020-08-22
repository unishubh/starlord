import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Select from 'react-select';
import { UserContext } from '../UserContext';
import config from '../config';

function UserPapers() {
  const { token, setToken } = useContext(UserContext);
  const [options, setOptions] = useState([]);
  // const [examID,setExamID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [examName, setExamName] = useState('');
  const [papers, setPapers] = useState([]);
  const [papercount, setPapercount] = useState(null);
  const { examID } = useParams();
  const accessToken = localStorage.getItem('token');
  const history = useHistory();
  useEffect(() => {
    setIsLoading(true);
    // console.log("uius");
    //    console.log(examID);
    fetch(`${config.apiUrl}api/paper/exam/${examID}`, {
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
        //   console.log(data);
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
            text: 'This exam have no papers yet ',
            icon: 'error',
            button: 'Got it',
          });
        }
        //   history.push('/');
      });
  }, []);
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
{' '}
Papers :
{papercount}
                      </h2>
                      <button
                        onClick={(e) => window.history.back()}
                        className="btn hero-btn"
                        data-animation="fadeInLeft"
                        data-delay=".8s"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="col-sm-6" />
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

export default UserPapers;
