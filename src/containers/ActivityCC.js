import React, { Component } from 'react';

import ActivityPC from '../components/cardview/ActivityPC';

const moment = require('moment');

class ActivityCC extends Component {
  state = {
    body: '',
  };

  handleChange = e => {
    this.setState({ body: e.target.value });
  };

  handleAddActivity = () => {
    const obj = {
      body: this.state.body,
      taskId: this.props.task.id,
      userId: this.props.userId,
      logDate: moment().format('YYYY.MM.DD h:mm:ss'),
    };
    this.props.activityFunc.Create(obj);
    this.setState({ body: '' });
  };

  handleDeleteActivity = e => {
    const id = parseInt(e.target.value, 10);
    const func = this.props.activityFunc.Delete;
    func(id);
  };

  render() {
    return (
      <ActivityPC
        activeFormBody={this.state.body}
        handleChange={this.handleChange}
        handleAddActivity={this.handleAddActivity}
        handleDeleteActivity={this.handleDeleteActivity}
        {...this.props}
      />
    );
  }
}

export default ActivityCC;
