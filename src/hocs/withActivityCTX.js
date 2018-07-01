import React, { Component } from 'react';
import { ActivityProvider, ActivityConsumer } from '../contexts/ActivityCTX';

export default function withActivityCTX(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <ActivityProvider>
          <ActivityConsumer>
            {({ ActivityState, ActivityFunc }) => (
              <WrappedComponent
                ActivityState={ActivityState}
                ActivityFunc={ActivityFunc}
                {...this.props}
              />
            )}
          </ActivityConsumer>
        </ActivityProvider>
      );
    }
  };
}
