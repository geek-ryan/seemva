import React from 'react';
import { Route, Switch } from 'react-router-dom';

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
import UnitTestPage from '../pages/UnitTestPage';
import TimelinePage from '../pages/TimelinePage';

function TeamPage({ match }) {
  return (
    <TeamProvider teamID={match.params.id}>
      <MemberProvider teamID={match.params.id}>
        <LabelProvider>
          <ProjectProvider teamID={match.params.id}>
            <TaskProvider>
              <ActivityProvider>
                <div className="team-page">
                  <SideNavCC teamID={match.url} />
                  <div className="team-content">
                    <HeaderCC />
                    <Switch>
                      <Route path="/card/:id" component={CardView} />
                      <Route path="/test/:id" component={UnitTestPage} />
                      <Route path="/tl/:id" component={Timeline} />
                    </Switch>
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

function CardView({ match }) {
  return (
    <div className="team-card">
      <div className="team-card__list">
        <CardViewPage teamCurrent={match.params.id} />
      </div>
    </div>
  );
}

function Timeline({ match }) {
  console.log('team page', match);
  return (
    <div className="team-card">
      <div className="team-card__list">
        <TimelinePage teamCurrent={match.params.id} />
      </div>
    </div>
  );
}

export default withAuth(TeamPage);
