import React, { Component } from 'react';
import { ProjectConsumer } from '../contexts/ProjectCTX';

export default function withProjectCTX(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <ProjectConsumer>
          {({ projectState, projectFunc }) => (
            <WrappedComponent
              projectState={projectState}
              projectFunc={projectFunc}
              {...this.props}
            />
          )}
        </ProjectConsumer>
      );
    }
  };
}
