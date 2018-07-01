import React, { Component } from 'react';
import { Progress } from 'antd';

class ProgressBarPC extends Component {
  loadCal = () => {
    let k = 0;
    this.props.userState.loading ? k++ : '';
    this.props.projectState.loading ? k++ : '';
    this.props.taskState.loading ? k++ : '';
    this.props.activityState.loading ? k++ : '';
    this.props.labelState.loading ? k++ : '';
    // console.log(k);
    return 100 - k * 20;
  };

  render() {
    let k = this.loadCal();
    return <Progress percent={k} status="active" />;
  }
}

export default ProgressBarPC;
