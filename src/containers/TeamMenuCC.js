import React, { Component } from 'react';

import { TeamConsumer } from '../contexts/TeamCTX';
import TeamMenuPC from '../components/layout/TeamMenuPC';

class TeamMenuCC extends Component {
  render() {
    return (
      <TeamConsumer>
        {({ teams, current, changeCurrent }) => (
          <TeamMenuPC
            teams={teams}
            current={current}
            onChangeCurrent={changeCurrent}
          />
        )}
      </TeamConsumer>
    );
  }
}

export default TeamMenuCC;
