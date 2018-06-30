import React, { Component } from 'react';

import { AuthConsumer } from '../contexts/AuthCTX';
import { TeamConsumer } from '../contexts/TeamCTX';
import TeamMenuPC from '../components/layout/TeamMenuPC';

class TeamMenuCC extends Component {
  render() {
    return (
      <AuthConsumer>
        {({ id }) => (
          <TeamConsumer>
            {({ deleteTeam, createTeam, changeCurrent, ...value }) => (
              <TeamMenuPC
                {...value}
                onDeleteTeam={deleteTeam}
                onCreateTeam={createTeam}
                onChangeCurrent={changeCurrent}
              />
            )}
          </TeamConsumer>
        )}
      </AuthConsumer>
    );
  }
}

export default TeamMenuCC;
