import React, { Component } from 'react';
import { ActivityConsumer } from '../contexts/ActivityCTX';

export default function withActivityCTX(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <ActivityConsumer>
          {({ activityState, activityFunc }) => (
            <WrappedComponent
              activityState={activityState}
              activityFunc={activityFunc}
              {...this.props}
            />
          )}
        </ActivityConsumer>
      );
    }
  };
}
