import React from 'react';

import withAuth from '../hocs/withAuth';
import { TeamProvider } from '../contexts/TeamCTX';
import { MemberProvider } from '../contexts/MemberCTX';
import { LabelProvider } from '../contexts/LabelCTX';
import { ActivityProvider } from '../contexts/ActivityCTX';

// import TimelineCC from '../components/timeline/TimelineCC';

// function TimelinePage(props) {
class TimelinePage extends React.Component {
  render() {
    return (
      <TeamProvider>
        <MemberProvider>
          {/* <UserProvider> */}
          <LabelProvider>
            {/* <TaskProvider> */}
            <ActivityProvider>
              {/* <TimelineCC {...this.props} /> */}
            </ActivityProvider>
            {/* </TaskProvider> */}
          </LabelProvider>
          {/* </UserProvider> */}
        </MemberProvider>
      </TeamProvider>
    );
  }
}

export default withAuth(TimelinePage);
