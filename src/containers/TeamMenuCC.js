import React, { Component } from 'react';

import TeamMenuPC from '../components/layout/TeamMenuPC';
import { Route, Switch } from 'react-router-dom';

class TeamMenuCC extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            path={'/card'}
            render={({ match }) => (
              <TeamMenuPC match={match} viewtype={'card'} />
            )}
          />
          <Route
            path={'/tl'}
            render={({ match }) => <TeamMenuPC match={match} viewtype={'tl'} />}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default TeamMenuCC;
