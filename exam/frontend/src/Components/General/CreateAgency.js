import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import config from '../config';

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
  // const { token, setToken } = useContext(UserContext);
  const [agency, setAgency] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('create agency');
    setIsLoading(true);
    fetch(`${config.apiUrl}user/create_agency/${agency}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // agency: agency,
      }),
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) return response.json();

        throw new Error(response.status);
      })
      .then((data) => {
        console.log(data);
        swal({
          title: 'Yayyy',
          text: 'Agency Has Been Created ',
          icon: 'success',
          button: 'Got it',
        });
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
            title: 'Oops',
            text: `Something went wrong ${error}`,
            icon: 'error',
            button: 'Got it',
          });
        }
      });
    console.log('agency created');
  };

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
        <Container component="main" maxWidth="xs" id="SignIn">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create Agency
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="agency"
                label="Enter Agency Name"
                name="agency"
                // autoComplete="email"
                value={agency}
                autoFocus
                onChange={(e) => setAgency(e.target.value)}
              />

              {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
              <Button fullWidth variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                Create Agency
              </Button>
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
      )}
    </div>
  );
}
