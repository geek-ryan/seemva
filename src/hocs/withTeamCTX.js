import React, { Component } from 'react';
import { TeamConsumer } from '../contexts/TeamCTX';

export default function withTeamCTX(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <TeamConsumer>
          {({ teamCurrentID }) => (
            <WrappedComponent teamCurrent={teamCurrentID} />
          )}
        </TeamConsumer>
      );
    }
  };
}
