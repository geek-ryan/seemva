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
        {({ logout, username, profile }) => (
          <SideNavPC
            profile={profile}
            username={username}
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
