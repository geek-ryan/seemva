import React from 'react';

import withAuth from '../hocs/withAuth';
import { TeamProvider } from '../contexts/TeamCTX';
import { MemberProvider } from '../contexts/MemberCTX';
import SideNavCC from '../containers/SideNavCC';
import HeaderCC from '../containers/HeaderCC';
import CardViewPage from '../pages/CardViewPage';

function TeamPage({ match }) {
  return (
    <TeamProvider id={match.params.id}>
      <MemberProvider teamID={match.params.id}>
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
      </MemberProvider>
    </TeamProvider>
  );
}

export default withAuth(TeamPage);
