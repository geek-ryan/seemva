import React, { Component } from 'react';

import { TeamConsumer } from '../contexts/TeamCTX';
import TeamMenuPC from '../components/layout/TeamMenuPC';

class TeamMenuCC extends Component {
  render() {
    return (
      <TeamConsumer>
        {({ editTeam, deleteTeam, createTeam, changeCurrent, ...value }) => (
          <TeamMenuPC
            {...value}
            onEditTeam={editTeam}
            onDeleteTeam={deleteTeam}
            onCreateTeam={createTeam}
            onChangeCurrent={changeCurrent}
          />
        )}
      </TeamConsumer>
    );
  }
}

export default TeamMenuCC;
