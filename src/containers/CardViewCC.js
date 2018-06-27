import React, { Component } from 'react';
import { SignUpProfileConsumer } from '../contexts/SignUpProfileCTX';
import SignUpProfilePC from '../components/SignUpProfilePC';

class SignUpProfileCC extends Component {
  render() {
    return (
      <SignUpProfileConsumer>
        {({}) => <SignUpProfilePC />}
      </SignUpProfileConsumer>
    );
  }
}

export default SignUpProfileCC;
