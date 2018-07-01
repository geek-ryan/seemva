import React, { Component } from 'react';

import withTaskCTX from '../hocs/withTaskCTX';
import withUserCTX from '../hocs/withUserCTX';
import withLabelCTX from '../hocs/withLabelCTX';
import withActivityCTX from '../hocs/withActivityCTX';
import withProjectCTX from '../hocs/withProjectCTX';

import ProjectCardUnitPC from '../components/cardview/ProjectCardUnitPC';

var moment = require('moment');

class ProjectCardUnitCC extends Component {
  state = {
    visible: false,
    title: '',
    body: '',
    startDate: moment().format('YYYY.MM.DD'),
    dueDate: moment().format('YYYY.MM.DD'),
  };

  newTaskTitleChange = e => {
    this.setState({ title: e.target.value });
  };
  newTaskbodyChange = e => {
    this.setState({ body: e.target.value });
  };

  newTaskDateChange = (date, dateString) => {
    const startMoment = moment(dateString[0], 'YYYY.MM.DD');
    const dueMoment = moment(dateString[1], 'YYYY.MM.DD');
    if (startMoment > dueMoment) {
      alert('Please check date again');
    } else {
      this.setState({ startDate: dateString[0], dueDate: dateString[1] });
    }
  };

  // modal ----------------------
  newTaskShowModal = () => {
    this.setState({
      visible: true,
    });
  };

  newTaskOk = e => {
    //made task content
    const obj = {
      title: this.state.title,
      body: this.state.body,
      startDate: this.state.startDate,
      dueDate: this.state.dueDate,
      projectId: this.props.project.id,
      complete: false,
    };
    //Add labelAssign and task
    this.props.taskFunc.Create(obj);
    this.props.labelFunc.assigneeCreate(this.props.taskState.target);
    this.props.userFunc.assigneeCreate(this.props.taskState.target);
    this.setState({
      visible: false,
      title: '',
      body: '',
      startDate: moment().format('YYYY.MM.DD'),
      dueDate: moment().format('YYYY.MM.DD'),
    });
  };

  newTaskCancel = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <ProjectCardUnitPC
        taskNew={this.state}
        newTaskTitleChange={this.newTaskTitleChange}
        newTaskbodyChange={this.newTaskbodyChange}
        newTaskDateChange={this.newTaskDateChange}
        newTaskShowModal={this.newTaskShowModal}
        newTaskOk={this.newTaskOk}
        newTaskCancel={this.newTaskCancel}
        {...this.props}
      />
    );
  }
}

export default withUserCTX(
  withTaskCTX(withLabelCTX(withActivityCTX(ProjectCardUnitCC)))
);
