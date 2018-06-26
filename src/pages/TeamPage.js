import React from 'react';
import withAuth from '../hocs/withAuth.js';

function TeamPage() {
  return (
    <div className="team-page">
      <h1>Team page</h1>
    </div>
  );
}

export default withAuth(TeamPage);
