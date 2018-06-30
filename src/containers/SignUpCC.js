import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthConsumer } from '../contexts/AuthCTX';
import { ProfileConsumer } from '../contexts/ProfileCTX';
import SignUpFormPC from '../components/sign/SignUpFormPC';
import SignUpProfilePC from '../components/sign/SignUpProfilePC';

class SignUpCC extends Component {
  state = {
    success: false,
    errorCode: 0,
  };

  render() {
    const { success, errorCode } = this.state;
    if (success) return <Redirect to="/" />;
    return (
      <ProfileConsumer>
        {({ profile, loading, openUploadWiget, deleteProfile }) => (
          <AuthConsumer>
            {({ register }) => (
              <React.Fragment>
                <SignUpProfilePC
                  profile={profile}
                  loading={loading}
                  onOpenDialog={openUploadWiget}
                  onDeletProfile={async () => {
                    await deleteProfile();
                  }}
                />
                <SignUpFormPC
                  onSubmitRegister={async values => {
                    const payload = {
                      ...values,
                      profile,
                    };
                    try {
                      await register(payload);
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
        )}
      </ProfileConsumer>
    );
  }
}

export default SignUpCC;
