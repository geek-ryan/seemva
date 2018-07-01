import React, { Component } from 'react';
import { Modal } from 'antd';

import withTaskCTX from '../hocs/withTaskCTX';
import CardViewTaskModalPC from '../components/taskmodal/CardViewTaskModalPC';

var moment = require('moment');

class TaskModal extends Component {
  handleUnitComplete = () => {
    this.props.taskFunc.Complete(this.props.task.id);
  };
  taskModalCompleteConfirm = () => {
    const Complete = this.handleUnitComplete;
    Modal.confirm({
      title: 'Do you Want to delete these items?',
      content: 'Some descriptions',
      onOk() {
        Complete();
      },
      onCancel() {},
    });
  };

  handleUnitDelete = () => {
    this.props.taskFunc.Delete(this.props.task.id);
  };
  taskModalDeleteConfirm = () => {
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

  taskModalStartDateChange = (date, dateString) => {
    const startMoment = moment(dateString, 'YYYY.MM.DD');
    const dueMoment = moment(this.props.task.dueDate, 'YYYY.MM.DD');
    if (startMoment > dueMoment) {
      alert('Please check date again');
    } else {
      this.props.taskFunc.Update(this.props.task.id, 'startDate', dateString);
    }
  };

  taskModalDueDateChange = (date, dateString) => {
    const startMoment = moment(this.props.task.startDate, 'YYYY.MM.DD');
    const dueMoment = moment(dateString, 'YYYY.MM.DD');
    if (startMoment > dueMoment) {
      alert('Please check date again');
    } else {
      this.props.taskFunc.Update(this.props.task.id, 'dueDate', dateString);
    }
  };

  render() {
    return (
      <CardViewTaskModalPC
        taskModal={this.state}
        taskModalCompleteConfirm={this.taskModalCompleteConfirm}
        taskModalDeleteConfirm={this.taskModalCompleteConfirm}
        taskModalStartDateChange={this.taskModalStartDateChange}
        taskModalDueDateChange={this.taskModalDueDateChange}
        {...this.props}
      />
    );
  }
}

export default TaskModal;
