import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoginCC from '../containers/LoginCC';

class LoginPage extends Component {
  render() {
    return (
      <div className="login-page">
        <LoginCC />
        <Link to="/sign_up">Sign up</Link>
      </div>
    );
  }
}

export default LoginPage;
