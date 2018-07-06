import React, { Component } from 'react';
import { ProjectProvider, ProjectConsumer } from '../contexts/ProjectCTX';

import ProgressBarCC from '../containers/ProgressBarCC';

export default function withProjectCTX(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <ProjectProvider>
          <ProjectConsumer>
            {({ projectState, projectFunc }) => (
              <WrappedComponent
                projectState={projectState}
                projectFunc={projectFunc}
                {...this.props}
              />
            )}
          </ProjectConsumer>
        </ProjectProvider>
      );
    }
  };
}
