import React, { useEffect, useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import swal from 'sweetalert';
import { UserContext } from './UserContext';
import config from './config';

function AllExams() {
  const { token } = useContext(UserContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [exams, setExams] = useState([]);
  const [total, setTotal] = useState(0);
  const [search_item, setSerach_item] = useState('');
  const [search_results, setSearch_result] = useState([]);
  useEffect(() => {
    {
      const results = exams.filter((exam) => exam.name.toLowerCase().includes(search_item.toLocaleLowerCase()));
      setSearch_result(results);
    }
  }, [search_item, exams]);

  const Subscribe = (event) => {
    setIsLoading(true);
    const accessToken = localStorage.getItem('token');
    fetch(`${config.apiUrl}api/subscribe/${event.target.value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) return response.json();

        throw new Error(response.status);
      })
      .then((data) => {
        // console.log(data);
        // console.log(data.message);
        swal({
          title: 'Hey Yaayy !!',
          text: 'Exam Has Been Subscribed',
          icon: 'success',
          button: 'Got it',
        });

        history.push('/myexams');
      })
      .catch((error) => {
        if (error === 403) {
          swal({
            title: 'Oh Ohhh',
            text: 'Please Login Again',
            icon: 'warn',
            button: 'Got it',
          });
          history.push('/signin');
        } else {
          swal({
            title: 'Oh Ohhh',
            text: 'Either you have already subscribed or Something went wrong',
            icon: 'error',
            button: 'Got it',
          });
        }
      });
  };

  useEffect(() => {
    // console.log("uius");
    fetch(`${config.apiUrl}api/exam`)
      .then((response) => {
        // console.log(response);
        if (response.ok) return response.json();

        throw new Error(response.status);
      })
      .then((data) => {
        //   console.log(data);
        setTotal(data.examcount);
        setExams(data.examdata);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error === 403) {
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
          history.push('/');
        }
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
                        All Exams
                        {isLoading ? <>IS LOADING..</> : <>
{' '}
:{total}</>}
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
          <div className="about-details section-padding10" />
          <div className="col-lg-4">
            <div className="blog_right_sidebar">
              <aside className="single_sidebar_widget search_widget">
                <form>
                  <div className="form-group">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Exam"
                        value={search_item}
                        onChange={(e) => setSerach_item(e.target.value)}
                      />
                      <div className="input-group-append" />
                      <button className="btns" type="button">
                        <i className="ti-search" />
                      </button>
                    </div>
                  </div>
                  {/* </div> */}
                </form>
              </aside>
            </div>
          </div>

          <div className="row">
            {search_results.map((exam, key) => (
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div style={{ padding: '40px' }}>
                  <div className="my-own-card">
                    <div className="my-own-name">
                      <div className="hero-cap hero-cap2 text-center">
                        <h3 style={{ color: 'white' }}> 
{' '}
{exam.name}
{' '}
 </h3>
                      </div>
                    </div>
                    <div className="my-own-container">
                      <h5>
                        <b>
                          Max Marks :
{exam.max_marks}
                        </b>
                      </h5>
                      <h5>
                        Time Duration :
{exam.time} 
{' '}
{exam.time !== 1 ? <>Hours</> : <>Hour</>}
                      </h5>
                      <p>{exam.details}</p>
                      {token.role == 2 ? (
                        <>
                          <div className="button-group-area mt-10">
                            <button value={exam.id} onClick={Subscribe} className="genric-btn primary-border small">
                              Subscribe
                            </button>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      <div className="button-group-area mt-10">
                        <Link to={`/showpapers/${exam.id}`} className="genric-btn primary-border small">
                          Papers
                        </Link>
                      </div>
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

export default AllExams;
