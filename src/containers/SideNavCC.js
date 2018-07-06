import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthConsumer } from '../contexts/AuthCTX';
import SideNavPC from '../components/layout/SideNavPC';

class SideNavCC extends Component {
  state = {
    loggedOut: false,
    viewtype: '',
  };

  handleViewCard = () => {
    console.log('card');
    this.setState({ viewtype: 'card' });
    console.log(this.state.viewtype);
  };

  handleViewTl = () => {
    console.log('tl');
    this.setState({ viewtype: 'tl' });
    console.log(this.state.viewtype);
  };

  render() {
    const { loggedOut } = this.state;
    if (loggedOut) return <Redirect to="/login" />;
    return (
      <AuthConsumer>
        {({ username, profile, logout }) => (
          <SideNavPC
            onViewCard={this.handleViewCard}
            onViewTl={this.handleViewTl}
            viewtype={this.state.viewtype}
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
