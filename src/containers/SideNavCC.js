import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthConsumer } from '../contexts/AuthCTX';
import SideNavPC from '../components/layout/SideNavPC';
import { currentViewType } from '../actions';
import { connect } from 'react-redux';
class SideNavCC extends Component {
  state = {
    loggedOut: false,
    viewtype: '',
  };

  handleViewCard = () => {
    this.props.dispatch(currentViewType('card'));
  };

  handleViewTl = () => {
    this.props.dispatch(currentViewType('tl'));
  };

  render() {
    const { loggedOut } = this.state;
    if (loggedOut) return <Redirect to="/login" />;
    return (
      <AuthConsumer>
        {({ username, profile, logout }) => (
          <SideNavPC
            {...this.props}
            onViewCard={this.handleViewCard}
            onViewTl={this.handleViewTl}
            viewtype={this.props.currentViewType}
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

const pullingViewType = state => {
  return {
    currentViewType: state.currentReducer.viewType,
    teamCurrent: state.currentReducer.teamId,
  };
};

export default connect(pullingViewType)(SideNavCC);
