import React from 'react';

import withAuth from '../hocs/withAuth';
import { TeamProvider } from '../contexts/TeamCTX';
import { MemberProvider } from '../contexts/MemberCTX';
import { LabelProvider } from '../contexts/LabelCTX';
import { TaskProvider } from '../contexts/TaskCTX';
import { ActivityProvider } from '../contexts/ActivityCTX';
import { ProjectProvider } from '../contexts/ProjectCTX';

// test unit
import LabelPC from '../components/cardview/LabelPC';
import TaskCardPC from '../components/cardview/TaskCardPC';

function UniTestPage({ match }) {
  return (
    <TeamProvider id={match.params.id}>
      <MemberProvider teamID={match.params.id}>
        <LabelProvider>
          <ProjectProvider teamID={match.params.id}>
            <TaskProvider teamID={match.params.id}>
              <ActivityProvider>
                <div style={{}}>
                  <LabelPC />
                  <TaskCardPC />
                </div>
              </ActivityProvider>
            </TaskProvider>
          </ProjectProvider>
        </LabelProvider>
      </MemberProvider>
    </TeamProvider>
  );
}

export default withAuth(UniTestPage);
