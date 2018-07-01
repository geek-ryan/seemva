import React, { Component } from 'react';
import { TaskProvider, TaskConsumer } from '../contexts/TaskCTX';

export default function withTaskCTX(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <TaskProvider>
          <TaskConsumer>
            {({ taskState, taskFunc }) => (
              <WrappedComponent
                taskState={taskState}
                taskFunc={taskFunc}
                {...this.props}
              />
            )}
          </TaskConsumer>
        </TaskProvider>
      );
    }
  };
}
