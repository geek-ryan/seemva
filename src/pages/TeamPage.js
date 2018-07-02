import React from 'react';

import withAuth from '../hocs/withAuth';
import { TeamProvider } from '../contexts/TeamCTX';
import { UserProvider } from '../contexts/UserCTX';
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
      <UserProvider>
        <LabelProvider>
          <ProjectProvider>
            <TaskProvider>
              <ActivityProvider>
                <div className="team-page">
                  <SideNavCC />
                  <div className="team-content">
                    <HeaderCC />
                    <div className="team-card">
                      <div className="team-card__list">
                        <CardViewPage />
                      </div>
                    </div>
                  </div>
                </div>
              </ActivityProvider>
            </TaskProvider>
          </ProjectProvider>
        </LabelProvider>
      </UserProvider>
    </TeamProvider>
  );
}

export default withAuth(TeamPage);
