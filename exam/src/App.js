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
function App() {

    const [user,setUser] = useState("Arihant");

  return (
    <div>
      <UserContext.Provider value={{user,setUser}}>
      <Navbar/>
     <Main/>
     <Switch>
       {/* <Route exact path='/' component={SignInStudent} /> */}
       <Route exact path='/' component={Home} />
       <Route exact path='/agencysignin' component={SignInAgency} />
       <Route exact path='/studentsignin' component={SignInStudent} />
       <Route exact path='/register' component={SignUp} />
       <Route exact path='/about' component={About} />

   
   </Switch> 
   </UserContext.Provider>
    </div>
  );
}

export default App;
