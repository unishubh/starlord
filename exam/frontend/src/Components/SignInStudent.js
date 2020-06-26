import React ,{useState, useEffect, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import {UserContext} from './UserContext';
var jwtDecode = require('jwt-decode');


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
 
  const history = useHistory();
  const classes = useStyles();
  const {token,setToken} = useContext(UserContext);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = () => {

    console.log("loginstarted");
    // history.push('/');
    
   
    // var decode = jwtDecode("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6ImM1YTUxNjEyLWNkMDAtNGRkYS1hMWYzLTkyY2QwMjVjNjk1ZCIsImlhdCI6MTU5MjU3OTc2NywiZXhwIjoxNTkyNTgzMzY3fQ.toBG6c1OftJjRVwjXD6UK9djDSwddPCnYi8UP3s5P7k");
    
    // console.log(decode.admin);
    
    
  
    fetch('https://www.mutualfundcalculator.in/starlord/user/login',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.setItem("token", data.message);
        if(data.message!="invalid user" && data.message!="invalid password")
        {var decoded = jwtDecode(data.message)
        setToken(decoded);
        history.push('/');  
      }
      else{
        alert(data.message);
      }

        
      })    
    console.log("Login Done");

  };


  return (
   
    <Container component="main" maxWidth="xs" id="SignInStudent">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
                Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value = {email}
            autoFocus
            onChange = {e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value = {password}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange = {e => setPassword(e.target.value)}
          
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            
            fullWidth
            variant="contained"
            color="primary"
            
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
{/*     
      <Link href="/agencysignin">
      <Button
            type="button"
            fullWidth
            variant="contained"
            color="warm"
          >
            If you are an Agency click here
          </Button>
          </Link> */}
      </Box>
    </Container>
  );
}