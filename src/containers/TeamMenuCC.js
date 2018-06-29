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
            {({ teams, current, changeCurrent }) => (
              <TeamMenuPC
                authID={id}
                teams={teams}
                current={current}
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
