import React, { Component } from 'react';
import { Modal } from 'antd';
import { Redirect, Link } from 'react-router-dom';

import CardViewTaskUnitPC from '../components/cardview/CardViewTaskUnitPC';

class CardViewTaskUnitCC extends Component {
  state = {
    visible: false,
  };

  componentDidMount = () => {
    console.log(this.state.match);
  };

  taskShowModal = () => {
    // console.log('show');
    this.props.labelFunc.teamFilter(this.props.project.teamId);
    this.props.labelFunc.taskFilter(this.props.task.id);
    this.props.userFunc.teamFilter();
    this.props.userFunc.taskFilter(this.props.task.id);
    this.setState({
      visible: true,
    });
  };

  taskOk = e => {
    this.props.labelFunc.assigneeCreate(this.props.task.id);
    this.props.userFunc.assigneeCreate(this.props.task.id);
    this.setState({
      visible: false,
    });
  };

  taskCancle = e => {
    this.setState({
      visible: false,
    });
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
          taskCancle={this.taskCancle}
          taskDeleteConfirm={this.taskDeleteConfirm}
          {...this.props}
        />
      </React.Fragment>
    );
  }
}

export default CardViewTaskUnitCC;
