import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthConsumer } from '../contexts/AuthCTX';
import SideNavPC from '../components/layout/SideNavPC';

class SideNavCC extends Component {
  state = {
    loggedOut: false,
  };

  render() {
    const { loggedOut } = this.state;
    if (loggedOut) return <Redirect to="/login" />;
    return (
      <AuthConsumer>
        {({ username, profile, logout }) => (
          <SideNavPC
            username={username}
            profile={profile}
            onLogout={() => {
              logout();
              this.setState({ loggedOut: true });
            }}
          />
        )}
      </AuthConsumer>
    );
  }
}

export default SideNavCC;
