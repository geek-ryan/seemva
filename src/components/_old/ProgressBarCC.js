import React, { Component } from 'react';

import withTaskCTX from '../hocs/withTaskCTX';
import withUserCTX from '../hocs/withUserCTX';
import withLabelCTX from '../hocs/withLabelCTX';
import withActivityCTX from '../hocs/withActivityCTX';
import withProjectCTX from '../hocs/withProjectCTX';

import ProgressBarPC from '../components/utils/ProgressBarPC';

class ProgressBarCC extends Component {
  render() {
    return <ProgressBarPC {...this.props} />;
  }
}

export default withTaskCTX(
  withUserCTX(withLabelCTX(withActivityCTX(withProjectCTX(ProgressBarCC))))
);
