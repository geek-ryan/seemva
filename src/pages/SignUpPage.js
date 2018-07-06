import React from 'react';
import { Link } from 'react-router-dom';

import SignUpCC from '../containers/SignUpCC';

function SignUpPage() {
  return (
    <div className="sign-up-page">
      <SignUpCC />
      <Link className="sign-anchor" to="/login">
        Log in
      </Link>
    </div>
  );
}

export default SignUpPage;
