import React, { Component } from 'react';

import ProjectCardUnitPC from '../components/cardview/ProjectCardUnitPC';

import { createTask } from '../actions';
import { connect } from 'react-redux';
import { deleteProject } from '../actions';

var moment = require('moment');

class ProjectCardUnitCC extends Component {
  static defaultProps = {
    project: {
      id: 0, // 현재 프로젝트의 아이디
    },
    taskFunc: {
      Create: obj => {}, // 정보를 받아서 task를 생성하는 함수
    },
    teamId: 0,
    projectId: 0,
    dispatch: () => console.log('dispatch default props'),
  };

  state = {
    visible: false,
    title: '',
  };

  handleProjectDelete = id => {
    this.props.dispatch(deleteProject(id));
  };

  newTaskTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  newTaskShowEditor = () => {
    this.setState({
      visible: true,
    });
  };

  // create new task
  newTaskOk = () => {
    // title이 있어야 전송한다.
    if (this.state.title) {
      const contents = {
        title: this.state.title,
        teamId: this.props.teamCurrent,
        complete: false,
        projectId: this.props.project.id,
        logDate: moment(),
      };
      this.props.dispatch(createTask(contents));
      this.setState({ title: '' });
    }
    this.newTaskCancel();
  };

  newTaskCancel = () => {
    this.setState({
      visible: false,
      title: '',
    });
  };

  render() {
    return (
      <ProjectCardUnitPC
        {...this.props}
        taskNew={this.state}
        newTaskTitleChange={this.newTaskTitleChange}
        newTaskbodyChange={this.newTaskbodyChange}
        newTaskShowEditor={this.newTaskShowEditor}
        newTaskOk={this.newTaskOk}
        newTaskCancel={this.newTaskCancel}
        onProjectDelete={this.handleProjectDelete}
      />
    );
  }
}

const pullingTasks = state => {
  const taskArr = state.taskReducer.slice();
  return {
    tasks: taskArr.sort(
      (b, a) => moment(a.logDate).format('X') - moment(b.logDate).format('X')
    ),
  };
};

export default connect(pullingTasks)(ProjectCardUnitCC);
