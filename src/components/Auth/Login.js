import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

// import { connect } from 'react-redux';
// import { login } from '../store/authActions'

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    margin: theme.spacing(3, 0, 3),
  },
});

class Login extends React.Component {

    state = {
        email: null,
        password: null,
        login: false,
    }

    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
      console.log(this.state)
    }

    handleSubmit = (event) => {
        axios({
            method: 'post',
            url: 'http://divyansh.zapto.org:3000/login',
            data: this.state,
            headers: {'Content-Type': 'application/json' }
            })
            .then(function (response) {
                //handle success
                console.log(response.data);
                if (typeof window !== 'undefined') {
                  const token = response.data.token;
                  localStorage.setItem('jwt-token', token);
                }
                // this.setState({login: true})
            })
            // .then(function (res) {localStorage.setItem('jwt', res.data); console.log(this.state)})
            .catch(function (response) {
                //handle error
                console.log(response);
            });

      event.preventDefault();
      // this.props.onAuth(this.state.email, this.state.password)
    }

 render() {

    const { classes } = this.props;

    return (
      <>
      {
      !this.state.login ?
        <Container component="main" maxWidth="xs" >
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              login
            </Typography>
    
            <form className={classes.form} onChange={this.handleChange} onSubmit={this.handleSubmit} noValidate>
              <Grid container spacing={2} align="center" justify="center">
                
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
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
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
        :
        <Container>You are already logged in</Container>
      }
      </>
    );
 }
  
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  }
}
  
  export default connect(null, mapDispatchToProps)(withStyles(styles)(Login));