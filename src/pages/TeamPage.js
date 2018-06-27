import React from 'react';
import withAuth from '../hocs/withAuth.js';
import SideNavPC from '../components/layout/SideNavPC';

function TeamPage() {
  return (
    <div className="team-page">
      <SideNavPC />
      <div>Card View</div>
    </div>
  );
}

export default withAuth(TeamPage);
