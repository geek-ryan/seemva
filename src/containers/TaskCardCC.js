import React, { Component } from 'react';
import { Modal } from 'antd';

import TaskCardPC from '../components/cardview/TaskCardPC';
import withTeamMember from '../hocs/withTeamMember';

class TaskCardCC extends Component {
  state = {
    visible: false,
  };

  taskShowModal = () => {
    // console.log('show');
    // this.props.labelFunc.teamFilter(this.props.teamId);
    // this.props.labelFunc.taskFilter(this.props.task.id);
    // this.props.userFunc.teamFilter();
    // this.props.userFunc.taskFilter(this.props.task.id);
    this.setState({
      visible: true,
    });
  };

  taskOk = e => {
    // this.props.labelFunc.assigneeCreate(this.props.task.id);
    // this.props.userFunc.assigneeCreate(this.props.task.id);
    this.setState({
      visible: false,
    });
  };

  taskCancel = e => {
    this.setState({
      visible: false,
    });
  };

  taskDeleteConfirm = () => {
    const Delete = () => this.props.taskFunc.Delete(this.props.task.id);
    Modal.confirm({
      title: 'Are you sure delete this task?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        Delete();
      },
      onCancel() {},
    });
  };

  taskCompleteToggle = () => {
    this.props.taskFunc.Complete(this.props.task.id, this.props.task.complete);
  };

  async componentDidMount() {
    await this.props.fetchMatchData(this.props.task.id);
  }

  render() {
    return (
      <TaskCardPC
        {...this.props}
        taskModal={this.state}
        taskShowModal={this.taskShowModal}
        taskOk={this.taskOk}
        taskCancel={this.taskCancel}
        taskDeleteConfirm={this.taskDeleteConfirm}
        taskCompleteToggle={this.taskCompleteToggle}
      />
    );
  }
}

export default withTeamMember(TaskCardCC);
