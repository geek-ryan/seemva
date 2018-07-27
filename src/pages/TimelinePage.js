import React from 'react';

import withAuth from '../hocs/withAuth';
import { MemberProvider } from '../contexts/MemberCTX';
import { LabelProvider } from '../contexts/LabelCTX';
// import TimelineCC from '../components/timeline/TimelineCC';

// function TimelinePage(props) {
class TimelinePage extends React.Component {
  render() {
    return (
      <MemberProvider>
        {/* <UserProvider> */}
        <LabelProvider>
          {/* <TaskProvider> */}

          {/* <TimelineCC {...this.props} /> */}

          {/* </TaskProvider> */}
        </LabelProvider>
        {/* </UserProvider> */}
      </MemberProvider>
    );
  }
}

export default withAuth(TimelinePage);
