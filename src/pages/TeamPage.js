import React from 'react';

import withAuth from '../hocs/withAuth';
import { TeamProvider } from '../contexts/TeamCTX';
import SideNavCC from '../containers/SideNavCC';

function TeamPage({ match }) {
  return (
    <TeamProvider id={match.params.id}>
      <div className="team-page">
        <SideNavCC />
        <div className="team-content">
          여기에 헤더와 카드/타임라인/캘린더 뷰 페이지를 넣으면 됩니다.
        </div>
      </div>
    </TeamProvider>
  );
}

export default withAuth(TeamPage);
