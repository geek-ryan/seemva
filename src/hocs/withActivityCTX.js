import React, { Component } from 'react';
import { ActivityProvider, ActivityConsumer } from '../contexts/ActivityCTX';

export default function withActivityCTX(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <ActivityProvider>
          <ActivityConsumer>
            {({ activityState, activityFunc }) => (
              <WrappedComponent
                activityState={activityState}
                activityFunc={activityFunc}
                {...this.props}
              />
            )}
          </ActivityConsumer>
        </ActivityProvider>
      );
    }
  };
}
