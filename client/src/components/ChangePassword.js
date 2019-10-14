import React, { Component } from 'react';
import axios from 'axios';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newpassword: '',
      newpasswordc: ''
    };
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = async event => {
    event.preventDefault();
    if (this.state.newpasswordc != this.state.newpassword) {
      alert('Password is not the same');
      return;
    }
    let tempProp = this.props;
    axios
      .post('api/users/changePassword', {
        password: this.state.password,
        newPassword: this.state.newpassword
      })
      .then(function(res) {
        if (res.status === 200) {
          tempProp.history.push('/account');
        }
      })
      .catch(function(error) {
        if (error.response) {
          alert(error.response.data.error);
        }
      });
  };
  render() {
    return (
      <div className="row">
        <div id="login-form" className="col s12 m12">
          <div className="card">
            <div className="container">
              <div className="card-content">
                <h3>Change Password</h3>
                <form onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter current password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="password"
                        name="newpassword"
                        placeholder="Enter new password"
                        value={this.state.newpassword}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="password"
                        name="newpasswordc"
                        placeholder="Confirm new password"
                        value={this.state.newpasswordc}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <input type="submit" value="Submit" className="btn" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
