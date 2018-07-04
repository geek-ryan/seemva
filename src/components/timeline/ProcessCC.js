import React, { Component } from 'react';
import Process from './Process';

import withTaskCTX from '../../hocs/withTaskCTX';

var moment = require('moment');

class ProcessCC extends Component {
  render() {
    return <Process {...this.props} />;
  }
}

export default ProcessCC;
