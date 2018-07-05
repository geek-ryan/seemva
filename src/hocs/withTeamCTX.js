import React, { Component } from 'react';
import { TeamConsumer } from '../contexts/TeamCTX';

export default function withTeamCTX(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <TeamConsumer>
          {({ teamCurrent }) => <WrappedComponent teamCurrent={teamCurrent} />}
        </TeamConsumer>
      );
    }
  };
}
