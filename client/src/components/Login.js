// Login.jsx
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { withStore } from './store';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      email: '',
      password: '',
      emailSU: '',
      passwordSU: '',
      passwordcSU: '',
      nameSU: ''
    };
  }
  componentDidMount() {
    fetch('api/users/checkToken').then(res => {
      if (res.status === 200) {
        this.props.store.set('authenticated', true);
        this.props.history.push('/');
      }
    });
    console.log(this.props);
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };
  onSubmitLogin = async event => {
    event.preventDefault();
    // axios
    //   .post('http://localhost:5000/api/users/authenticate', this.state)
    //   .then(function(response) {
    //     console.log(response.headers.get('x-auth-token'));
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //     alert(error.response.data.error);
    //   });
    fetch('api/users/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async res => {
        if (res.status === 200) {
          this.props.store.set('authenticated', true);
          this.props.history.push('/');
        } else {
          const response = await res.json();

          alert(response.error);
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      });
  };
  onSubmitSignup = async event => {
    event.preventDefault();
    if (this.state.passwordSU != this.state.passwordcSU) {
      alert('Password is not the same');
      return;
    }
    let tempProp = this.props;
    axios
      .post('api/users/', {
        name: this.state.nameSU,
        email: this.state.emailSU,
        password: this.state.passwordSU
      })
      .then(function(res) {
        if (res.status === 200) {
          tempProp.store.set('authenticated', true);
          tempProp.history.push('/');
        }
      })
      .catch(function(error) {
        console.log('heyya');
        console.log(error);
        if (error.response) {
          alert(error.response.data);
        }
      });
    // fetch('api/users/', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     name: this.state.nameSU,
    //     email: this.state.emailSU,
    //     password: this.state.passwordSU
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(async res => {
    //     if (res.status === 200) {
    //       this.props.store.set('authenticated', true);
    //       this.props.history.push('/');
    //     } else {
    //       const response = await res.json();
    //       console.log('hehehe');
    //       alert(response);
    //     }
    //   })
    //   .catch(err => {
    //     console.log('hahaha');
    //     console.error(err);
    //     alert('Error signing up please try again');
    //   });
  };
  render() {
    return (
      <div className="row">
        <div id="login-form" className="col s12 m6">
          <div className="card">
            <div className="card-content">
              <h3>Login</h3>
              <form onSubmit={this.onSubmitLogin}>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                </div>
                <input type="submit" value="Login" className="btn" />
              </form>
            </div>
          </div>
        </div>
        <div id="signup-form" className="col s12 m6">
          <div className="card">
            <div className="card-content">
              <h3>Sign up</h3>
              <form onSubmit={this.onSubmitSignup}>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      type="email"
                      name="emailSU"
                      placeholder="Enter email"
                      value={this.state.emailSU}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      type="text"
                      name="nameSU"
                      placeholder="Enter name"
                      value={this.state.nameSU}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      type="password"
                      name="passwordSU"
                      placeholder="Enter password"
                      value={this.state.passwordSU}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      type="password"
                      name="passwordcSU"
                      placeholder="Confirm password"
                      value={this.state.passwordcSU}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                </div>
                <input type="submit" value="Register" className="btn" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStore(Login);
