import React, { Component } from 'react';

import { TeamConsumer } from '../contexts/TeamCTX';
import TeamMenuPC from '../components/layout/TeamMenuPC';
import { ProjectConsumer } from '../contexts/ProjectCTX';

class TeamMenuCC extends Component {
  render() {
    return (
      <TeamConsumer>
        {({ editTeam, deleteTeam, createTeam, changeCurrent, ...value }) => {
          return (
            <ProjectConsumer>
              {({ projectState, projectFunc }) => {
                return (
                  <TeamMenuPC
                    {...value}
                    onEditTeam={editTeam}
                    onDeleteTeam={deleteTeam}
                    onCreateTeam={createTeam}
                    onChangeCurrent={changeCurrent}
                    projectState={projectState}
                    projectFunc={projectFunc}
                  />
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
