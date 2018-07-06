import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthConsumer } from '../contexts/AuthCTX';
import LoginFormPC from '../components/sign/LoginFormPC';

class LoginCC extends Component {
  state = {
    success: false,
    errorCode: 0,
    profile: '',
  };

  render() {
    const { success, errorCode } = this.state;
    if (success) return <Redirect to="/" />;
    return (
      <AuthConsumer>
        {({ login }) => (
          <React.Fragment>
            <LoginFormPC
              onSubmitLogin={async values => {
                const { username, password } = values;
                try {
                  await login(username, password);
                  this.setState({ success: true });
                } catch (e) {
                  if (e.response && e.response.status === 400) {
                    this.setState({ errorCode: 400 });
                  } else {
                    this.setState({ errorCode: 500 });
                  }
                }
              }}
              errorCode={errorCode}
            />
          </React.Fragment>
        )}
      </AuthConsumer>
    );
  }
}

export default LoginCC;
