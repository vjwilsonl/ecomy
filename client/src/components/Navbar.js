import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStore } from './store';
import M from 'materialize-css/dist/js/materialize.min.js';

class Navbar extends Component {
  componentDidMount() {
    fetch('api/users/checkToken').then(res => {
      if (res.status === 200) {
        this.props.store.set('authenticated', true);
        fetch('api/users/current').then(async res => {
          if (res.status === 200) {
            this.props.store.set('user', await res.json());
          }
        });
      }
    });
  }
  render() {
    M.AutoInit();
    return (
      <div>
        <ul id="dropdown1" className="dropdown-content">
          <li>
            <a href="#!">one</a>
          </li>
          <li>
            <a href="#!">two</a>
          </li>
          <li className="divider" />
          <li>
            <a href="#!">three</a>
          </li>
        </ul>
        {/* Main nav */}
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">
              Ecomy
            </a>
            {this.props.store.authenticated ? (
              <ul id="nav-mobile" className="right ">
                <li className="hide-on-med-and-down">
                  <a href="/account">My Account</a>
                </li>
                <li>
                  <a
                    href="#"
                    data-target="slide-out"
                    className="sidenav-trigger"
                  >
                    <i className="material-icons">view_module</i>
                  </a>
                </li>
              </ul>
            ) : (
              ''
            )}
          </div>
        </nav>
        {/*Side nav*/}
        <ul id="slide-out" className="sidenav">
          <li>
            <div className="user-view">
              <div className="background">
                <img src="https://materializecss.com/images/office.jpg" />
              </div>
              <a href="#user">
                <img
                  className="circle"
                  src="https://materializecss.com/images/yuna.jpg"
                />
              </a>
              <a href="#name">
                <span className="white-text name">
                  {this.props.store.user ? this.props.store.user.name : ''}
                </span>
              </a>
              <a href="#email">
                <span className="white-text email">
                  {this.props.store.user ? this.props.store.user.email : ''}
                </span>
              </a>
            </div>
          </li>
          <li>
            <a href="/account">
              <i className="material-icons">person</i>My Account
            </a>
          </li>
          <li>
            <a href="#!">
              <i className="material-icons">cloud</i>First Link With Icon
            </a>
          </li>
          <li>
            <a href="#!">
              <i className="material-icons">cloud</i>Second Link With Icon
            </a>
          </li>
          <li>
            <a href="#!">Third Link</a>
          </li>
          <li>
            <a href="#!">Fourth Link</a>
          </li>
          <li>
            <a href="#!">Fifth Link</a>
          </li>
          <li>
            <div className="divider" />
          </li>
          <li>
            <a className="subheader">Subheader</a>
          </li>
          <li>
            <a className="waves-effect" href="#!">
              Additional Link With Waves
            </a>
          </li>
          <li>
            <a className="waves-effect" href="#!">
              Additional Link With Waves
            </a>
          </li>
          <li>
            <a className="waves-effect" href="#!">
              Additional Link With Waves
            </a>
          </li>
          <li>
            <a className="waves-effect red" href="api/logout">
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default withStore(Navbar);
