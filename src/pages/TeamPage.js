import React from 'react';

import withAuth from '../hocs/withAuth';
import withUserMe from '../hocs/withUserMe';
import { TeamProvider } from '../contexts/TeamCTX';
import SideNavCC from '../containers/SideNavCC';
import CardViewPage from '../pages/CardViewPage';

function TeamPage({ userId, match }) {
  return (
    <TeamProvider id={match.params.id} userId={userId}>
      <div className="team-page">
        <SideNavCC />
        <div className="team-content">
          <div>헤더</div>
          <div className="team-card">
            <div className="team-card__list">
              <CardViewPage />
            </div>
          </div>
        </div>
      </div>
    </TeamProvider>
  );
}

export default withAuth(withUserMe(TeamPage));
