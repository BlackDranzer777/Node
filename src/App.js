import React from 'react';
import './App.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages'
import SigninPage from './pages/SignInPage'
import OrderPage from './pages/order'
import ManageItems from './components/Manage/ManageItems'
import SignUpPage from './pages/SignUpPage';
import ManageRestaurants from './components/Manage/ManageRestaurants';
import ManageOutlets from './components/Manage/ManageOutlets';
import ManageEmployees from './components/Manage/ManageEmployees';
import ManageCustomers from './components/Manage/ManageCustomers';



function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={SigninPage} exact />
        <Route path="/signup" component={SignUpPage} exact />
        <Route path="/order" component={OrderPage} exact />
        <Route path="/manage/items" component={ManageItems} exact />
        <Route path="/manage/restaurants" component={ManageRestaurants} exact />
        <Route path="/manage/outlets" component={ManageOutlets} exact />
        <Route path="/manage/employees" component={ManageEmployees} exact />
        <Route path="/manage/customers" component={ManageCustomers} exact />
      </Switch>    
    </Router>
  );
}

export default App;