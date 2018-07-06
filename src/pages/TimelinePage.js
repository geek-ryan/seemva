import React from 'react';

import withAuth from '../hocs/withAuth';
import { TeamProvider } from '../contexts/TeamCTX';
import { MemberProvider } from '../contexts/MemberCTX';
import { UserProvider } from '../contexts/UserCTX';
import { LabelProvider } from '../contexts/LabelCTX';
import { TaskProvider } from '../contexts/TaskCTX';
import { ActivityProvider } from '../contexts/ActivityCTX';
import { ProjectProvider } from '../contexts/ProjectCTX';

import SideNavCC from '../containers/SideNavCC';
import HeaderCC from '../containers/HeaderCC';
import CardViewPage from '../pages/CardViewPage';
import TimelineCC from '../components/timeline/TimelineCC';

function TimelinePage(props) {
  // console.log('time line page mathc', match);
  console.log('time line page teamCurrent', props.teamCurrent);
  return (
    <TeamProvider>
      <MemberProvider>
        {/* <UserProvider> */}
        <LabelProvider>
          <ProjectProvider>
            <TaskProvider>
              <ActivityProvider>
                <TimelineCC teamCurrent={props.teamCurrent} />
              </ActivityProvider>
            </TaskProvider>
          </ProjectProvider>
        </LabelProvider>
        {/* </UserProvider> */}
      </MemberProvider>
    </TeamProvider>
  );
}

export default withAuth(TimelinePage);
