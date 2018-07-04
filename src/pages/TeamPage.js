import React from 'react';

import withAuth from '../hocs/withAuth';
import { TeamProvider } from '../contexts/TeamCTX';
import { MemberProvider } from '../contexts/MemberCTX';
import { LabelProvider } from '../contexts/LabelCTX';
import { TaskProvider } from '../contexts/TaskCTX';
import { ActivityProvider } from '../contexts/ActivityCTX';
import { ProjectProvider } from '../contexts/ProjectCTX';

import SideNavCC from '../containers/SideNavCC';
import HeaderCC from '../containers/HeaderCC';
import CardViewPage from '../pages/CardViewPage';

function TeamPage({ match }) {
  return (
    <TeamProvider id={match.params.id}>
      <MemberProvider teamID={match.params.id}>
        <LabelProvider>
          <ProjectProvider teamCurrent={match.params.id}>
            <TaskProvider>
              <ActivityProvider>
                <div className="team-page">
                  <SideNavCC />
                  <div className="team-content">
                    <HeaderCC />
                    <div className="team-card">
                      <div className="team-card__list">
                        <CardViewPage teamCurrent={match.params.id} />
                      </div>
                    </div>
                  </div>
                </div>
              </ActivityProvider>
            </TaskProvider>
          </ProjectProvider>
        </LabelProvider>
      </MemberProvider>
    </TeamProvider>
  );
}

export default withAuth(TeamPage);
