import React, { Component } from 'react';
import { Modal } from 'antd';
import { Redirect, Link } from 'react-router-dom';

import CardViewTaskUnitPC from '../components/cardview/_CardViewTaskUnitPC';

class CardViewTaskUnitCC extends Component {
  taskShowModal = () => {
    this.props.labelFunc.teamFilter(this.props.project.teamId);
    this.props.labelFunc.taskFilter(this.props.task.id);
    this.props.userFunc.teamFilter();
    this.props.userFunc.taskFilter(this.props.task.id);
  };

  taskOk = e => {
    this.props.labelFunc.assigneeCreate(this.props.task.id);
    this.props.userFunc.assigneeCreate(this.props.task.id);
  };

  handleUnitDelete = () => {
    this.props.taskFunc.Delete(this.props.task.id);
  };

  taskDeleteConfirm = () => {
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
      <React.Fragment>
        <CardViewTaskUnitPC
          taskModal={this.state}
          taskShowModal={this.taskShowModal}
          taskOk={this.taskOk}
          taskDeleteConfirm={this.taskDeleteConfirm}
          {...this.props}
        />
      </React.Fragment>
    );
  }
}

export default CardViewTaskUnitCC;
