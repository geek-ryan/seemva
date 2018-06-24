import React, { Component } from 'react';
import { SignUpConsumer } from '../contexts/SignUpCTX';
import SignUpFormPC from '../components/SignUpFormPC';
import SignUpProfileCC from '../containers/SignUpProfileCC';

class SignUpCC extends Component {
  state = {
    success: false,
    username: '',
    password: '',
    email: '',
    profile: '',
  };
  render() {
    return (
      <SignUpConsumer>
        {({ register }) => (
          <React.Fragment>
            <SignUpProfileCC />
            <SignUpFormPC />
          </React.Fragment>
        )}
      </SignUpConsumer>
    );
  }
}

export default SignUpCC;
