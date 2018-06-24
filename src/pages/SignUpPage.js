import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SignUpCC from '../containers/SignUpCC';

class SignUpPage extends Component {
  render() {
    return (
      <div className="sign-up-page">
        <SignUpCC />
        <Link to="/login">Log in</Link>
      </div>
    );
  }
}

export default SignUpPage;
