import React, { useState } from 'react';
import './App.css';
import Main from './frontend/Components/Main';
import {Switch , Route } from 'react-router-dom';

import SignInAgency from './frontend/Components/SignInAgency';
import SignInStudent from './frontend/Components/SignInStudent';
import SignUp from './frontend/Components/SignUp';
import Home from './frontend/Components/Home';
import Navbar from './frontend/Components/Navbar/Navbar';
import {UserContext} from './frontend/Components/UserContext';
import About from './frontend/Components/About';
import Admin from './frontend/Components/Admin';
import CreateExam from './frontend/Components/CreateExam';
import CreatePaper from './frontend/Components/CreatePaper';
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
      { token ? <Route exact path='/createexam' component={CreateExam} /> : <></> }
      { token ? <Route exact path='/createpaper' component={CreatePaper} /> : <></> }

   
   </Switch> 
   </UserContext.Provider>
    </div>
  );
}

export default App;
