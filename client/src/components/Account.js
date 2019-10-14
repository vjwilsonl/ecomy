import React, { Component } from 'react';

class Account extends Component {
  constructor() {
    super();
    //Set default message
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    //GET message from server using fetch api
    fetch('api/users/current')
      .then(res => res.text())
      .then(res => this.setState({ user: JSON.parse(res) }));
  }
  render() {
    return (
      <div className="row">
        <div id="account" className="col s12 m12">
          <div className="card-panel ">
            <div className="center">
              <h3>My Account</h3>
              <div>
                <strong>Name</strong>: {this.state.user.name}
              </div>
              <div>
                <strong>Email</strong>: {this.state.user.email}
              </div>
              <div>
                <strong>Education</strong>: Etiam dolor massa
              </div>
              <div>
                <strong>About me</strong>: Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Etiam fermentum gravida aliquam.
                Vivamus tristique sem ut quam varius, nec sodales nisi suscipit.
                Etiam dolor massa, viverra quis massa a, varius lacinia eros.
                Proin eget elementum neque. In fringilla libero non dignissim
                pretium.{' '}
              </div>
              <br />
              <div>
                <a href="/changePassword">
                  <button className="btn">Change Password</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
