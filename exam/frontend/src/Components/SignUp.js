import React , {useState, useEffect, useContext} from 'react';
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
    { value: '0', label: 'STUDENT' },
    
  ];
  const history = useHistory();
  const {token,setToken} = useContext(UserContext);
  const classes = useStyles();
  const [name,setName] = useState("");
  const [role,setRole] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [agencyID,setAgencyID] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Register Started");

    fetch('http://www.mutualfundcalculator.in/starlord/user/register',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name : name,
          email: email,
          role: role,
          password: password,
          agencyID:agencyID
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if(data.message.accessToken)
         { console.log("data is ")
          
          console.log(data.message.accessToken)
          console.log(data.message.data.name)
          localStorage.setItem("token",data.message.accessToken)
          var decoded = jwtDecode(data.message.accessToken);
          setToken(decoded);
          // console.log(token.role);
          history.push('/');}
          else{
            alert(data.message)
          }

          
      })
      console.log("Registration ",token)
    };


  return (
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
            </Grid>
            <Grid item xs={12} sm={6}>
            <Select
                                    
              onChange={e=> setRole(e.value)}
              options={options}
            />
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
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
  );
}