import React, { Component } from 'react';
import { SignUpConsumer } from '../contexts/SignUpCTX';
import SignUpFormPC from '../components/SignUpFormPC';

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
      <SignUpConsumer>{({ register }) => <SignUpFormPC />}</SignUpConsumer>
    );
  }
}

export default SignUpCC;
