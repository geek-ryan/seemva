import React from 'react';

import withAuth from '../hocs/withAuth';
import { TeamProvider } from '../contexts/TeamCTX';
import { MemberProvider } from '../contexts/MemberCTX';
import { UserProvider } from '../contexts/UserCTX';
import { LabelProvider } from '../contexts/LabelCTX';
import { TaskProvider } from '../contexts/TaskCTX';
import { ActivityProvider } from '../contexts/ActivityCTX';
import { ProjectProvider } from '../contexts/ProjectCTX';

// test unit
import LabelPC from '../components/cardview/LabelPC';

function UniTestPage({ match }) {
  return (
    <TeamProvider id={match.params.id}>
      <MemberProvider teamID={match.params.id}>
        <UserProvider>
          <LabelProvider>
            <ProjectProvider>
              <TaskProvider>
                <ActivityProvider>
                  <LabelPC />
                </ActivityProvider>
              </TaskProvider>
            </ProjectProvider>
          </LabelProvider>
        </UserProvider>
      </MemberProvider>
    </TeamProvider>
  );
}

export default withAuth(UniTestPage);
