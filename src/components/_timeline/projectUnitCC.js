import React, { Component } from 'react';
import ProjectUnit from './ProjectUnit';

import withTaskCTX from '../../hocs/withTaskCTX';

class ProjectUnitCC extends Component {
  render() {
    return <ProjectUnit {...this.props} />;
  }
}

export default withTaskCTX(ProjectUnitCC);
