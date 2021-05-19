import React from 'react';
import './App.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import OrderPage from './pages/OrderPage'
import SideMenu from './components/shared/SideMenu';
import { createMuiTheme, CssBaseline, makeStyles, withStyles } from '@material-ui/core';
import Header from './components/shared/Header';
import { ThemeProvider } from 'styled-components';
import Employees from './pages/Employees';
import Outlets from './pages/Outlets';
import Items from './pages/Items';
import Restaurants from './pages/Restaurants';
import Customers from './pages/Customers';
import { authenticationService } from './_services';
import { history, Role } from './_helpers';
import { PrivateRoute } from './components/Auth/PrivateRoute';
import OwnerDashboard from './pages/OwnerDashboard';

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

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAdmin: false,
      isUser: false,
      isEmployee: false,
    }
  } 

  componentDidMount() {
    console.log(this.state.currentUser, 'subscribe s pehle')

    authenticationService.currentUser.subscribe(x => this.setState({
      currentUser: x,
      isAdmin: x && x.role === Role.Admin,
      isUser: x && x.role === Role.User,
      isEmployee: x && x.role === Role.Employee,
    }))
    console.log(this.state.currentUser, 'compdidmount')
  }


  render() {

  const {classes} = this.props;
  const {currentUser} = this.state;
  console.log(currentUser, 'app')
  return (
      <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Router>
        {currentUser && <SideMenu />}
        <div className={currentUser && classes.appMain}>
        {currentUser && <Header />}
          <Switch>
          <PrivateRoute path="/" component={Home} exact />
          <PrivateRoute path="/od" component={OwnerDashboard} exact roles={[Role.User]}/>
          <PrivateRoute path="/employees" component={Employees} exact roles={[Role.User]}/>
          <PrivateRoute path="/outlets" component={Outlets} exact roles={[Role.User]}/>
          <PrivateRoute path="/items" component={Items} exact roles={[Role.User]}/>
          <PrivateRoute path="/restaurants" component={Restaurants} exact roles={[Role.User]}/>
          <PrivateRoute path="/customers" component={Customers} exact roles={[Role.User]}/>
          <PrivateRoute path="/order" component={OrderPage} exact roles={[Role.User]}/>
          <Route path="/login" component={LoginPage} exact/>
          <Route path="/signup" component={SignupPage} exact/> 
          </Switch>
        </div>
        <CssBaseline />
        </Router>
      
      </ThemeProvider>
      </div>
    )
  }
}

export default withStyles(styles)(App);