import React from 'react';
import { Link } from 'react-router-dom';

import LoginCC from '../containers/LoginCC';

function LoginPage() {
  return (
    <div className="login-page">
      <h1 className="login-page__logo">SEEMVA</h1>
      <LoginCC />
      <Link className="sign-anchor" to="/sign_up">
        Sign up
      </Link>
    </div>
  );
}

export default LoginPage;
