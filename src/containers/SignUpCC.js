import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthConsumer } from '../contexts/AuthCTX';
import SignUpFormPC from '../components/SignUpFormPC';
import SignUpProfileCC from '../containers/SignUpProfileCC';

class SignUpCC extends Component {
  state = {
    success: false,
    errorCode: 0,
    profile: '',
  };

  render() {
    const { success, errorCode, profile } = this.state;
    if (success) return <Redirect to="/" />;
    return (
      <AuthConsumer>
        {({ register, users }) => (
          <React.Fragment>
            <SignUpProfileCC />
            <SignUpFormPC
              onSubmitRegister={async values => {
                const { username, email, password } = values;
                try {
                  await register(username, email, password, profile);
                  this.setState({ success: true });
                } catch (e) {
                  if (e.response && e.response.status === 400) {
                    this.setState({ errorCode: 400 });
                  } else {
                    this.setState({ errorCode: 500 });
                  }
                }
              }}
              onBlurUserName={username =>
                users.some(user => user.username === username)
              }
              errorCode={errorCode}
            />
          </React.Fragment>
        )}
      </AuthConsumer>
    );
  }
}

export default SignUpCC;
