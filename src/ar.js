import React from 'react';
import axios from 'axios';
import './App.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import OrderPage from './pages/OrderPage'
import ManageItems from './components/Manage/ManageItems'
import ManageRestaurants from './components/Manage/ManageRestaurants';
import ManageOutlets from './components/Manage/ManageOutlets';
import ManageEmployees from './components/Manage/ManageEmployees';
import ManageCustomers from './components/Manage/ManageCustomers';
import SideMenu from './components/shared/SideMenu';
import { createMuiTheme, CssBaseline, makeStyles, withStyles } from '@material-ui/core';
import Header from './components/shared/Header';
import { ThemeProvider } from 'styled-components';
import Employees from './pages/Employees';
import Outlets from './pages/Outlets';
import Items from './pages/Items';
import Restaurants from './pages/Restaurants';
import Customers from './pages/Customers';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333996',
      light: '#ebf2f5'
    },
    secondary: {
      main: '#f83245',
      light: '#f7e6e6'
    },
    background:{
      default:'#f4f5fd'
    },
  },
  shape : {
    borderRadius: "12px"
  },
  typography: {
    fontFamily: '"Nunito", sans-serif'
  }
})

const styles = theme => ({
  appMain : {
    paddingLeft: '250px',
    width: '100%',
  },
  root:{
    zoom: '90%'
  }
})

class App extends React.Component {

  state = {}; 

  // componentDidMount() {
  //   const config = {
  //     headers: {
  //       Authorization: 'Bearer' + localStorage.getItem('token')
  //     }
  //   }
  //   axios.get('http://divyansh.zapto.org:3000/user', config)
  //     .then(res => {
  //       console.log(res);
  //       this.setState({
  //         user: res.data
  //       })
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }
  

  render() {

    const refresh = refreshToken => {
      console.log('Refreshing Token');

      return new Promise((resolve, reject) => {
        axios.post("http://localhost:3000/refresh", { token: refreshToken })
        .then(res => {
          if(res.data.success === false){
            //set message and return
            resolve(false);
          } else {
            const {accessToken} = res.data;
            localStorage.setItem('access', accessToken);
            resolve(accessToken);
          }
        })
      })
    }

    const requestLogin = async(accessToken, refreshToken) => {
      return new Promise((resolve, reject) => {
        axios.post("http://localhost:3000/protected", {}, {headers : {"authorization": `Bearer ${accessToken}`}})
        .then(async res => {
          if (res.data.success === false){
            if (res.data.message==="User not authenticated"){
              //set err mesg
            } else if (res.data.message==="Access token expired"){
              const accessToken = await refresh(refreshToken);
              return await requestLogin(accessToken, refreshToken);
            }
            resolve(false);
          } else {
            //protected has been valid accessed
            resolve(true);
          }
        });
      })
    };

    const hasAccess = async(accessToken, refreshToken) => {
      if (!refreshToken) return null;

      if (accessToken === undefined){
        // generate new accessToken
        accessToken = await refresh(refreshToken);
        return accessToken;
      }

      return accessToken;
    };

    const protect = async e => {
      let accessToken = localStorage.getItem('access');
      let refreshToken = localStorage.getItem('refresh');

      accessToken = await hasAccess(accessToken, refreshToken);

      if (!accessToken) {
        // Set a message to login again

      } else {
        await requestLogin(accessToken, refreshToken);
      }
    }

  const {classes} = this.props;

    return (
      <div className={classes.root}>
      <ThemeProvider theme={theme}>
      <Router>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        <Switch>
        <Route path="/" component={Home} exact />

        {/* <Route path="/" component={<Home user={this.state.user}/>} exact /> */}
        <Route path="/employees" component={Employees} exact />
        <Route path="/outlets" component={Outlets} exact />
        <Route path="/items" component={Items} exact />
        <Route path="/restaurants" component={Restaurants} exact />
        <Route path="/customers" component={Customers} exact />
        <Route path="/order" component={OrderPage} exact />
        <Route path="/login" component={LoginPage} exact/>
        <Route path="/signup" component={SignupPage} exact/>
        </Switch>
      </div>
      <CssBaseline />
      <Switch>
        
      </Switch>
        {/* <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={SigninPage} exact />
          <Route path="/signup" component={SignUpPage} exact />
          <Route path="/order" component={OrderPage} exact />
          <Route path="/manage/items" component={ManageItems} exact />
          <Route path="/manage/restaurants" component={ManageRestaurants} exact />
          <Route path="/manage/outlets" component={ManageOutlets} exact />
          <Route path="/manage/employees" component={ManageEmployees} exact />
          <Route path="/manage/customers" component={ManageCustomers} exact />

        </Switch>     */}
      </Router>
      </ThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);