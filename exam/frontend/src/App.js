import React, { useState,useEffect, useContext } from 'react';
import './App.css';
import Main from './Components/Main';
import {Switch , Route } from 'react-router-dom';


import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Navbar from './Components/Navbar/Navbar';
import {UserContext} from './Components/UserContext';
import About from './Components/About';
import Admin from './Components/Admin';
import CreateExam from './Components/CreateExam';
import CreatePaper from './Components/CreatePaper';
import Exams from './Components/Exams';
import AddQuestion from './Components/AddQuestion';
import Papers from './Components/Papers';
import PreviewPapers from './Components/PreviewPaper';
import NotValid from './Components/NotValid';
import CreateAgency from './Components/CreateAgency';
import AllExam from './Components/AllExam';
import swal from 'sweetalert';
import {useHistory} from 'react-router-dom';
import YouLost from './Components/YouLost';
function App() {
  
    // localStorage.setItem("token",null) 
    const [token,setToken] = useState(null);
    const history = useHistory();
    useEffect ( async () => {
      const istoken = await localStorage.getItem("token");
    if(istoken ){
      var jwtDecode = require('jwt-decode');
      var decoded = await jwtDecode(istoken);
    
      setToken(decoded);
      
     
    }
    else{
    console.log("token is yhhh  ",token);
    }}
    ,[]);
    useEffect (
      () => {
        console.log("token is " ,token);
        if(token)
        console.log("jab ", token.userId);
      },[token]
    );
   return (
    <div>
      <UserContext.Provider value={{token,setToken}}>
      <Navbar/>
     <Main/>
     <Switch>
       {/* <Route exact path='/' component={SignInStudent} /> */}
       
       <Route exact path='/' component={Home} />
       <Route exact path='/signin' component={SignIn} />
       <Route exact path='/register' component={SignUp} />
       <Route exact path='/about' component={About} />
       <Route exact path='/admin' component={Admin} />
       <Route exact path='/allexams' component={AllExam} />
       {!token ?  <Route exact path='/createagency' component={CreateAgency} /> :  <Route exact path='/createagency' component={NotValid} />}
      { (token && token.role===1)  ? <Route exact path='/createexam' component={CreateExam} /> : <Route exact path='/createexam' component={NotValid} /> }
      { (token && token.role===1) ? <Route exact path='/createpaper' component={CreatePaper} /> : <Route exact path='/createpaper' component={NotValid} /> }
      { (token ) ? <Route exact path='/exams' component={Exams} /> : <Route exact path='/exams' component={NotValid} /> }
      { (token ) ? <Route exact path='/papers' component={Papers} /> : <Route exact path='/papers' component={NotValid} /> }
      { (token && token.role===1)? <Route exact path='/preview/:paperID' component={PreviewPapers} /> : <Route exact path='/preview/:paperID' component={NotValid} /> }
      { (token && token.role===1) ? <Route exact path='/addquestion/:paperID' component={AddQuestion} /> : <Route exact path='/addquestion/:paperID' component={NotValid} /> }
       <Route  component={YouLost}/>  
   
   </Switch> 
   </UserContext.Provider>
    </div>
  );
}

export default App;
