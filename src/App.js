import React, { Component } from 'react';
import { HashRouter, Route } from "react-router-dom";
import './style.css';
import Search from './library/search';
import Login from './auth/login';
import Landing from './home/landing';
import ForgotPassword from './auth/forgot_password';
import ChangePassword from './auth/change_password';
import ResetPassword from './auth/reset_password';
import logout from './auth/logout';
import Otp from './auth/login/otp';
import Details from './library/details';
import AdminDashboard from './management/index';

class App extends Component {
  render() {
    return (
        <HashRouter>
          <div>
            <Route exact  path={"/"} component={Landing}/>
            <Route path="/search" component={Search}/>
            <Route path="/details/:book" component={Details}/>
            <Route path="/auth/login" component={Login}/>
            <Route path="/auth/otp" component={Otp}/>
            <Route path="/auth/logout" component={logout}/>
            <Route path="/auth/forgot" component={ForgotPassword}/>
            <Route path="/auth/change" component={ChangePassword}/>
            <Route path="/auth/reset" component={ResetPassword}/>
            <Route path="/admin/" component={AdminDashboard}/>
          </div>
        </HashRouter>
    );
  }
}

export default App;
