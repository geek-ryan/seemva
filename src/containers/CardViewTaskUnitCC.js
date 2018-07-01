import React, { Component } from 'react';
import { Modal } from 'antd';

import withTaskCTX from '../hocs/withTaskCTX';
import CardViewTaskUnitPC from '../components/taskmodal/CardViewTaskUnitPC';

class CardViewTaskModalCC extends Component {
  state = {
    visible: false,
  };

  showModal = () => {
    console.log('show');
    this.props.labelFunc.teamFilter(this.props.teamId);
    this.props.labelFunc.taskFilter(this.props.task.id);
    this.props.userFunc.teamFilter();
    this.props.userFunc.taskFilter(this.props.task.id);
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.props.labelFunc.assigneeCreate(this.props.task.id);
    this.props.userFunc.assigneeCreate(this.props.task.id);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  handleUnitDelete = () => {
    this.props.taskFunc.Delete(this.props.task.id);
  };

  showDeleteConfirm = () => {
    const Delete = this.handleUnitDelete;

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

  render() {
    return (
      <CardViewTaskUnitPC
        showModal={this.showModal}
        handleOk={this.handleOk}
        handleCancel={this.handleCancel}
        handleUnitDelete={this.handleUnitDelete}
        showDeleteConfirm={this.showDeleteConfirm}
        {...this.props}
      />
    );
  }
}

export default withTaskCTX(CardViewTaskModalCC);
