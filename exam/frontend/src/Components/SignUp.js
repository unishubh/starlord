import React , {useState, useEffect, useContext, useLayoutEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { UserContext } from './UserContext';
import Select from 'react-select';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>  
//   );
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  var jwtDecode = require('jwt-decode');
  const options = [
    { value: '1', label: 'ADMIN' },
    { value: '2', label: 'STUDENT' },
    
  ];
  const [agencies,setAgencies] = useState([]); 
  const history = useHistory();
  const {token,setToken} = useContext(UserContext);
  const classes = useStyles();
  const [name,setName] = useState("");
  const [role,setRole] = useState(2);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [agencyID,setAgencyID] = useState("");
  // const [isagency,setIsagency]=useState(true);
  const [confirmpassword,setConfirmPassword] = useState("");

  const [isLoading,setIsLoading] = useState(false);
  const [nameError,setNameError] = useState("");
  const [emailError,setEmailError] = useState("");
  const [passwordError,setPasswordError] = useState("");
  const [passwordMatchError,setPasswordMatchError]=useState("");
  const [count,setCount] = useState(-1);

  // useEffect(
  //   () => {

  //     console.log("USEEFFECT called isagency");
  //     setAgencies([{ value: '', label: 'ALLEN' },
  //     { value: '', label: 'FIITJEE' }])
  //   },[isagency]
  // );
  // useEffect(()=>{console.log(agencies)},[agencies]);


  useEffect(
    ()=>{
      let f = 0;
      setCount(c=>c+1);
      
      if(name=="")
      {
        setNameError("Please write your name");
        f=1;
      }
      else{
        setNameError("");
      }
      if(!email.includes('@') || !email.includes('.'))
      {
        setEmailError("Please provide valid email");
        f=1;
      }
      else{
        setEmailError("");
      }
      if(password=="")
      {
        setPasswordError("Please provide a password");
        f=1;
      }
      else{
        setPasswordError("");
      }
      if(password!=confirmpassword)
      {
        setPasswordMatchError("Password did not match");
        f=1;
      }
      else{
        setPasswordMatchError("");
      }
    },[name,email,password,confirmpassword]
  );


  const Validate = ()=>{
    let f = 0;
    if(name=="")
    {
      setNameError("Please write your name");
      f=1;
    }
    else{
      setNameError("");
    }
    if(!email.includes('@') || !email.includes('.'))
    {
      setEmailError("Please provide valid email");
      f=1;
    }
    else{
      setEmailError("");
    }
    if(password=="")
    {
      setPasswordError("Please provide a password");
      f=1;
    }
    else{
      setPasswordError("");
    }
    if(password!=confirmpassword)
    {
      setPasswordMatchError("Password did not match");
      f=1;
    }
    else{
      setPasswordMatchError("");
    }
    if(f==1)
      return false;
    return true;
  }


  const handleSubmit = (event) => {
    let isValid = Validate();
    setCount(1);
    if(isValid){
    event.preventDefault();
    setIsLoading(true);
    console.log("Register Started");
    console.log(JSON.stringify({
      name : name,
      email: email,
      role: role,
      password: password,
      confirmpassword:confirmpassword
    }));

    let bodydata;
    if(role==1)
    {
      bodydata = JSON.stringify({
        name : name,
        email: email,
        role: role,
        password: password,
        confirmpassword:confirmpassword,
        agencyID:agencyID
      })
      console.log("role is ", 1);
    }
    else{
      bodydata = JSON.stringify({
        name : name,
        email: email,
        role: role,
        password: password,
        confirmpassword:confirmpassword,
        
      })
      console.log("role is ", 2);
    }

    fetch('https://www.mutualfundcalculator.in/starlord/user/register',{
        method: 'POST',
        mode : 'cors',
        headers: {'Content-Type': 'application/json'},
        
        body: bodydata
      
     
      })
        .then(response => 
          { console.log(response);
            setIsLoading(false);
            if(response.ok)
            return response.json();
            else{
              throw new Error(response.status);
            }
          })
        .then(data => {
          console.log(data)
         
         console.log("data is ")
          
          console.log(data.message.accessToken)
          console.log(data.message.data.name)
          localStorage.setItem("token",data.message.accessToken)
          var decoded = jwtDecode(data.message.accessToken);
          setToken(decoded);
          // console.log(token.role);
          history.push('/');
          

          
      }).catch(
        (error)=>{
          swal({
            title: "Oops",
            text: "Incorrect Details or You are already registered",
            icon: "error",
            button: "Got it",
          });
        }
      );
      console.log("Registration ",token)
      }
    };


  return (
    <div>
     { isLoading ? 
     <div>
         
     <div className="preloader d-flex align-items-center justify-content-center">
         <div className="preloader-inner position-relative">
             <div className="preloader-circle"></div>
             <div className="preloader-img pere-text">
                 <img src="assets/img/logo/loder.png" alt=""/>
             </div>
         </div>
     </div>

 </div> :
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={name}
                onChange = {e => setName(e.target.value)}
              />
            { count<=0 ? <></> : <div style={{fontSize :12,color:"red"}}>
                {nameError}
              </div>}
            </Grid>
            <Grid item xs={12} sm={6}>
            {/* <Select
                                    
              onChange={e=> 
                {
                  setRole(e.value);
                  if(e.value==2){
                    setIsagency(false);
                  }
                  else{
                    setIsagency(true);
                  }
              
                }}
              options={options}
            /> */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange = {e => setEmail(e.target.value)}
              />
              { count<=0 ? <></> : <div style={{fontSize :12,color:"red"}}>
                {emailError}
              </div>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange = {e => setPassword(e.target.value)}
              />
              { count<=0 ? <></> : <div style={{fontSize :12,color:"red"}}>
                {passwordError}
              </div>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="text"
                id="confirmpassword"
                autoComplete="current-password"
                value={confirmpassword}
                onChange = {e => setConfirmPassword(e.target.value)}
              />
              { count<=0 ? <></> : <div style={{fontSize :12,color:"red"}}>
                {passwordMatchError}
              </div>}
            </Grid>
           { role==1? <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="agencyID"
                label="Agency Id"
                type="text"
                id="agencyID"
                value={agencyID}
                onChange = {e => setAgencyID(e.target.value)}
              />
            </Grid> :
            <Grid item xs={12} sm={6}>
            {/* <Select
                                    
              onChange={e=> 
                {
                  setAgencyID(e.value)
              
                }}
              options={agencies}
              placeholder="Select Your Agency"
            /> */}
            </Grid>
          }
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              /> */}
            </Grid>
          </Grid>
          <Button
           
            fullWidth
            variant="contained"
            color="primary"
            
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        {/* <Copyright /> */}
      </Box>
    </Container>
     }
     </div>
  );
}