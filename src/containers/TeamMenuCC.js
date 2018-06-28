import React, { Component } from 'react';

import { TeamConsumer } from '../contexts/TeamCTX';
import TeamMenuPC from '../components/layout/TeamMenuPC';

class TeamMenuCC extends Component {
  state = {
    success: false,
  };

  render() {
    const { success } = this.state;
    return (
      <TeamConsumer>
        {({ teams, current }) => <TeamMenuPC teams={teams} current={current} />}
      </TeamConsumer>
    );
  }
}

export default TeamMenuCC;
