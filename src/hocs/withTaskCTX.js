import React, { Component } from 'react';
import { TaskProvider, TaskConsumer } from '../contexts/TaskCTX';

export default function withTaskCTX(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <TaskProvider>
          <TaskConsumer>
            {({ TaskState, TaskFunc }) => (
              <WrappedComponent
                TaskState={TaskState}
                TaskFunc={TaskFunc}
                {...this.props}
              />
            )}
          </TaskConsumer>
        </TaskProvider>
      );
    }
  };
}
