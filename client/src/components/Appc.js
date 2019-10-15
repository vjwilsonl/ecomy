// App.js
import React, { Component } from 'react';
import { createStore } from './store';
import { BrowserRouter, Route } from 'react-router-dom';
import withAuth from './withAuth';

import Navbar from './Navbar';
import Login from './Login';
import Account from './Account';
import Home from './Home';
import ChangePassword from './ChangePassword';

const MyApp = props => (
  <BrowserRouter>
    <div className="container">
      <Navbar />
      <Route exact path="/" component={withAuth(Home)} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/account" component={withAuth(Account)} />
      <Route
        exact
        path="/changePassword"
        component={withAuth(ChangePassword)}
      />
    </div>
  </BrowserRouter>
);
export default createStore(MyApp);
