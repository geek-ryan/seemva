import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthConsumer } from '../contexts/AuthCTX';
import { ProfileProvider, ProfileConsumer } from '../contexts/ProfileCTX';
import SignUpFormPC from '../components/SignUpFormPC';
import SignUpProfilePC from '../components/SignUpProfilePC';

class SignUpCC extends Component {
  state = {
    success: false,
    errorCode: 0,
  };

  render() {
    const { success, errorCode } = this.state;
    if (success) return <Redirect to="/" />;
    return (
      <ProfileProvider>
        <ProfileConsumer>
          {({ profile, loading, openUploadWiget, deleteProfile }) => (
            <AuthConsumer>
              {({ register, users }) => (
                <React.Fragment>
                  <SignUpProfilePC
                    profile={profile}
                    loading={loading}
                    onOpenDialog={openUploadWiget}
                    onDeletProfile={async () => {
                      console.log('deleleelelel');
                      await deleteProfile();
                    }}
                  />
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
          )}
        </ProfileConsumer>
      </ProfileProvider>
    );
  }
}

export default SignUpCC;
