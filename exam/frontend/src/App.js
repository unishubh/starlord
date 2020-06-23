import React, { useState } from 'react';
import './App.css';
import Main from './Components/Main';
import {Switch , Route } from 'react-router-dom';

import SignInAgency from './Components/SignInAgency';
import SignInStudent from './Components/SignInStudent';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Navbar from './Components/Navbar/Navbar';
import {UserContext} from './Components/UserContext';
import About from './Components/About';
import Admin from './Components/Admin';
import CreateExam from './Components/CreateExam';
import CreatePaper from './Components/CreatePaper';
import Exams from './Components/Exams';
function App() {

    // localStorage.setItem("token",null)  
    const [token,setToken] = useState(localStorage.getItem("token"));

    console.log("token is ",token);
    

  return (
    <div>
      <UserContext.Provider value={{token,setToken}}>
      <Navbar/>
     <Main/>
     <Switch>
       {/* <Route exact path='/' component={SignInStudent} /> */}
       <Route exact path='/' component={Home} />
       <Route exact path='/agencysignin' component={SignInAgency} />
       <Route exact path='/signin' component={SignInStudent} />
       <Route exact path='/register' component={SignUp} />
       <Route exact path='/about' component={About} />
       <Route exact path='/admin' component={Admin} />
      { token ? <Route exact path='/createexam' component={CreateExam} /> : <Route exact path='/createexam' component={SignInStudent} /> }
      { token ? <Route exact path='/createpaper' component={CreatePaper} /> : <Route exact path='/createpaper' component={SignInStudent} /> }
      { token ? <Route exact path='/exams' component={Exams} /> : <Route exact path='/exams' component={SignInStudent} /> }

   
   </Switch> 
   </UserContext.Provider>
    </div>
  );
}

export default App;
