import React, { useState, useEffect } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
// import swal from 'sweetalert';
import Main from './Components/General/Main';

import SignIn from './Components/General/SignIn';
import SignUp from './Components/General/SignUp';
import Home from './Components/General/Home';
import Navbar from './Components/General/Navbar';
import { UserContext } from './Components/UserContext';
import About from './Components/General/About';
import Admin from './Components/Admin/Admin';
import CreateExam from './Components/Admin/CreateExam';
import CreatePaper from './Components/Admin/CreatePaper';
import Exams from './Components/Admin/Exams';
import AddQuestion from './Components/Admin/AddQuestion';
import Papers from './Components/Admin/Papers';
import PreviewPapers from './Components/Admin/PreviewPaper';
import NotValid from './Components/General/NotValid';
import CreateAgency from './Components/General/CreateAgency';
import AllExam from './Components/AllExam';

import YouLost from './Components/General/YouLost';
import MyExams from './Components/User/MyExams';
import MyAttemptedPapers from './Components/User/MyAttemptedPapers';
import UserPapers from './Components/User/UserPapers';
import AttemptPaper from './Components/User/AttemptPaper';
import PapersOfExam from './Components/Admin/PapersOfExam';
import ShowPapers from './Components/User/ShowPapers';
import PaperResult from './Components/User/PaperResult';

function App() {
  // localStorage.setItem("token",null)
  const [token, setToken] = useState(null);
  const [isExamStarted, setIsExamStarted] = useState(null);

  // useEffect ( async () => {
  //   const istoken = await localStorage.getItem("token");
  // if(istoken ){
  //   var jwtDecode = require('jwt-decode');
  //   var decoded = await jwtDecode(istoken);

  //   setToken(decoded);

  // }
  // else{
  // console.log("token is yhhh  ",token);
  // }
  // }
  // ,[]);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const istoken = localStorage.getItem('token');
      const decoded = jwtDecode(istoken);
      setToken(decoded);
    }
  }, []);

  // useEffect (
  //   () => {
  //     console.log("token is " ,token);
  //     if(token)
  //     console.log("token role ", token.role);
  //   },[token]
  // );
  return (
    <div>
      <UserContext.Provider value={{ token, setToken, isExamStarted, setIsExamStarted }}>
        {/* value of token role  : {token.role}  */}
        {isExamStarted ? <></> : <Navbar />}
        <Main />
        <Switch>
          {/* <Route exact path='/' component={SignInStudent} /> */}
          {token && token.role === 2 ? (
            <Route exact path="/attemptpaper/:paperID/:paperName" component={AttemptPaper} />
          ) : (
            <Route exact path="/attemptpaper/:paperID/:paperName" component={NotValid} />
          )}

          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/about" component={About} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/allexams" component={AllExam} />
          {!token ? (
            <Route exact path="/createagency" component={CreateAgency} />
          ) : (
            <Route exact path="/createagency" component={NotValid} />
          )}
          {token && token.role === 1 ? (
            <Route exact path="/createexam" component={CreateExam} />
          ) : (
            <Route exact path="/createexam" component={NotValid} />
          )}
          {token && token.role === 1 ? (
            <Route exact path="/createpaper" component={CreatePaper} />
          ) : (
            <Route exact path="/createpaper" component={NotValid} />
          )}
          {token && token.role === 1 ? (
            <Route exact path="/exams" component={Exams} />
          ) : (
            <Route exact path="/exams" component={NotValid} />
          )}
          {token && token.role === 1 ? (
            <Route exact path="/papers" component={Papers} />
          ) : (
            <Route exact path="/papers" component={NotValid} />
          )}
          {token && token.role === 1 ? (
            <Route exact path="/exam-papers/:examID" component={PapersOfExam} />
          ) : (
            <Route exact path="/exam-papers/:examID" component={NotValid} />
          )}
          {token && token.role === 1 ? (
            <Route exact path="/preview/:paperID" component={PreviewPapers} />
          ) : (
            <Route exact path="/preview/:paperID" component={NotValid} />
          )}
          {token && token.role === 1 ? (
            <Route exact path="/addquestion/:paperID" component={AddQuestion} />
          ) : (
            <Route exact path="/addquestion/:paperID" component={NotValid} />
          )}
          {token && token.role === 2 ? (
            <Route exact path="/myexams" component={MyExams} />
          ) : (
            <Route exact path="/myexams" component={NotValid} />
          )}
          {token && token.role === 2 ? (
            <Route exact path="/myattemptedpapers" component={MyAttemptedPapers} />
          ) : (
            <Route exact path="/myattemptedpapers" component={NotValid} />
          )}
          {token && token.role === 2 ? (
            <Route exact path="/mypapers/:examID" component={UserPapers} />
          ) : (
            <Route exact path="/mypapers/:examID" component={NotValid} />
          )}
          {token && token.role === 2 ? (
            <Route exact path="/showpapers/:examID" component={ShowPapers} />
          ) : (
            <Route exact path="/showpapers/:examID" component={NotValid} />
          )}
          {token && token.role === 2 ? (
            <Route exact path="/result/:paperID/:paperName" component={PaperResult} />
          ) : (
            <Route exact path="/result/:paperID/:paperName" component={NotValid} />
          )}

          <Route component={YouLost} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
