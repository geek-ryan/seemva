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
            {({ teams, loading, current, createTeam, changeCurrent }) => (
              <TeamMenuPC
                authID={id}
                loading={loading}
                teams={teams}
                current={current}
                onCreateTeam={name => createTeam(id, name)}
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
