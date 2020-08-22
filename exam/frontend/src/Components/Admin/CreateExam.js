import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { useForm } from 'react-hook-form';
import { UserContext } from '../UserContext';
import config from '../config';

function CreateExam() {
  const { token } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const { register, errors, watch, handleSubmit } = useForm();
  const watchMaxMarks = watch('maxMarks', 0);

  const history = useHistory();

  // Submission Start Here//
  const onSubmit = (values) => {
    setIsLoading(true);
    const accessToken = localStorage.getItem('token');

    fetch(`${config.apiUrl}api/exams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ agencyID: token.agencyID, ...values }),
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) return response.json();

        throw new Error(response.status);
      })
      .then(() => {
        // console.log(data);
        // console.log(data.message);
        swal({
          title: 'Hey Yaayy !!',
          text: 'Exam Has Been Created',
          icon: 'success',
          button: 'Got it',
        });
        history.push('/createpaper');
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
            text: 'Check your details',
            icon: 'error',
            button: 'Got it',
          });
        }
      });
    // console.log("Exam Done");
  };

  // Submission Ends Here
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
        <section className="contact-section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="contact-title">Create Exam</h2>
              </div>
              <div className="col-lg-8">
                <form className="form-contact contact_form" id="contactForm" onSubmit={handleSubmit(onSubmit)}>
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
                          name="name"
                          placeholder="Enter exam name"
                          ref={register({
                            required: 'Exam name is required',
                          })}
                        />
                        {errors?.name?.message && (
                          <div style={{ fontSize: 12, color: 'red' }}>{errors.name.message}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="number"
                          name="maxMarks"
                          placeholder="Maximum Marks"
                          ref={register({
                            required: 'Maximum marks are required',
                            min: {
                              value: 0,
                              message: 'Maximum marks should be positive',
                            },
                          })}
                        />
                        {errors?.maxMarks?.message && (
                          <div style={{ fontSize: 12, color: 'red' }}>{errors.maxMarks.message}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="number"
                          name="passMarks"
                          placeholder="Passing Marks"
                          ref={register({
                            required: 'Passing marks are required',
                            min: {
                              value: 0,
                              message: 'Passing marks should be positive',
                            },
                            max: {
                              value: Number(watchMaxMarks),
                              message: 'Should be lower than max marks',
                            },
                          })}
                        />
                        {errors?.passMarks?.message && (
                          <div style={{ fontSize: 12, color: 'red' }}>{errors.passMarks.message}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="number"
                          name="time"
                          placeholder="Time Limit In Hours"
                          ref={register({
                            required: 'Time limit is required',
                            min: {
                              value: 1,
                              message: 'Time limit should be greater than 0',
                            },
                          })}
                        />
                        {errors?.time?.message && (
                          <div style={{ fontSize: 12, color: 'red' }}>{errors.time.message}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          cols="30"
                          rows="9"
                          name="details"
                          type="text"
                          placeholder="Enter Details"
                          ref={register({
                            required: 'Details cannot be empty',
                          })}
                        />
                        {errors?.details?.message && (
                          <div style={{ fontSize: 12, color: 'red' }}>{errors.details.message}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <button type="submit" className="button button-contactForm boxed-btn">
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
