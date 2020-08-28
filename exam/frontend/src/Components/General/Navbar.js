import React, { useContext } from 'react';
import './Navbar.module.css';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Navbar() {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);

  // console.log("role ",token.role);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    // console.log("hi");
    // console.log(token);
    history.push('/');
  };

  const handleLogin = () => {
    history.push('/signin');
  };

  return (
    <div className="header-area">
      <div className="main-header ">
        <div className="header-top d-none d-lg-block">
          <div className="header-left-social">
            <ul className="header-social">
              <li>
                <a href="#twitter">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/prosperityjunction">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/prosperityjunction">
                  <i className="fab fa-linkedin-in" />
                </a>
              </li>
              <li>
                {' '}
                <a href="#gp">
                  <i className="fab fa-google-plus-g" />
                </a>
              </li>
            </ul>
          </div>
          <div className="container">
            <div className="col-xl-12">
              <div className="row d-flex justify-content-between align-items-center">
                <div className="header-info-left">
                  <ul>
                    <li>admin@prosperityjunction.com</li>
                    <li>+919307610900</li>
                  </ul>
                </div>
                <div className="header-info-right">
                  <ul>
                    {!token ? (
                      <>
                        <li>
                          <Link to="/signin">
                            <i className="ti-user" />
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link to="/register">
                            <i className="ti-lock" />
                            Register
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li>
                        <Link onClick={handleLogout} to="/">
                          <i className="ti-lock" />
                          Logout
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-top d-none d-lg-block">
          {/* <!-- Left Social --> */}

          <div className="container">
            <div className="col-xl-12">
              <div className="row d-flex justify-content-between align-items-center">
                <div className="header-info-right" />
              </div>
            </div>
          </div>
        </div>

        <div className="header-bottom header-sticky">
          {/* <!-- Logo --> */}
          <div className="logo d-none d-lg-block">
            <Link to="/">
              <img src="assets/img/logo/logo.png" alt="" />
            </Link>
          </div>

          <div className="container">
            <div className="menu-wrapper">
              {/* <!-- Logo --> */}
              <div className="logo logo2 d-block d-lg-none">
                {token ? (
                  <button type="button" onClick={handleLogout} className="genric-btn primary-border">
                    Logout
                  </button>
                ) : (
                  <button type="button" className="genric-btn primary-border" onClick={handleLogin}>
                    Login/Register
                  </button>
                )}
              </div>
              {/* <!-- Main-menu --> */}
              <div className="main-menu d-none d-lg-block">
                <nav>
                  <ul id="navigation">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">About</Link>
                    </li>
                    {/* <li><Link to="/allexams">All Exams</Link></li> */}
                    {/* {token && token.role===1?
                                <>
                                <li><Link to="/admin">Admin</Link>
                                    <ul className="submenu">
                                        <li><Link to="/createexam">Create Exam</Link></li>
                                        <li><Link to="/createpaper">Create Paper</Link></li>
                                        <li><Link to="/exams">See Exams</Link></li>
                                        <li><Link to="/papers">See Papers</Link></li>
                                    </ul>
                                </li>
                                </>
                                :
                                <>
                                {/* {token} */}
                    {/* <li><Link to="#">Options</Link>
                                    <ul className="submenu">
                                        <li><Link to="/myexams">My Exams</Link></li>
                                        <li><Link to="/myattemptedpapers">Attemped Paper</Link></li>

                                    </ul>
                                </li>
                                </> */}
                    {/* } */}
                    {/* */}

                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* <!-- Header-btn --> */}
            </div>
            {/* <!-- Mobile Menu --> */}
            <div className="col-12">
              <div className="mobile_menu d-block d-lg-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
