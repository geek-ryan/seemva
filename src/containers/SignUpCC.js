import React, { Component } from 'react';
import { SignUpConsumer } from '../components/SignUpFormCTX';
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
