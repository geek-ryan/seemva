import React, { Component } from 'react';

import { TeamConsumer } from '../contexts/TeamCTX';
import TeamMenuPC from '../components/layout/TeamMenuPC';
import { ProjectConsumer } from '../contexts/ProjectCTX';
import { Route, Link, Redirect, Switch } from 'react-router-dom';

class TeamMenuCC extends Component {
  render() {
    return (
      <TeamConsumer>
        {({ editTeam, deleteTeam, createTeam, changeCurrent, ...value }) => {
          return (
            <ProjectConsumer>
              {({ projectState, projectFunc }) => {
                return (
                  <React.Fragment>
                    <Switch>
                      <Route
                        path={'/card'}
                        render={({ match }) => (
                          <TeamMenuPC
                            match={match}
                            {...value}
                            viewtype={this.props.viewtype}
                            onEditTeam={editTeam}
                            onDeleteTeam={deleteTeam}
                            onCreateTeam={createTeam}
                            onChangeCurrent={changeCurrent}
                            projectState={projectState}
                            projectFunc={projectFunc}
                          />
                        )}
                      />

                      <Route
                        path={'/tl'}
                        render={({ match }) => (
                          <TeamMenuPC
                            match={match}
                            {...value}
                            viewtype={this.props.viewtype}
                            onEditTeam={editTeam}
                            onDeleteTeam={deleteTeam}
                            onCreateTeam={createTeam}
                            onChangeCurrent={changeCurrent}
                            projectState={projectState}
                            projectFunc={projectFunc}
                          />
                        )}
                      />
                    </Switch>
                  </React.Fragment>
                );
              }}
            </ProjectConsumer>
          );
        }}
      </TeamConsumer>
    );
  }
}

export default TeamMenuCC;
