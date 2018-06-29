import React, { Component } from 'react';
import { Button, Modal, DatePicker } from 'antd';

import EditableTextareaPC from '../utils/EditableTextareaPC';
import ActivityPC from '../cardview/ActivityPC';
import LabelSearchBar from '../utils/LabelSearchBar';
import UserSearchBar from '../utils/UserSearchBar';

var moment = require('moment');

class CardViewTaskModalPC extends Component {
  static defaultProps = {
    handleComplete: () => {},
    task: {},
    handleDeleteTask: () => {},
  };

  handleUnitDelete = () => {
    this.props.taskFunc.Delete(this.props.task.id);
  };

  handleUnitComplete = () => {
    this.props.taskFunc.Complete(this.props.task.id);
  };

  showConfirm = () => {
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

  handleStartDateChange = (date, dateString) => {
    const startMoment = moment(dateString, 'YYYY-MM-DD');
    const dueMoment = moment(this.props.task.dueDate, 'YYYY-MM-DD');
    if (startMoment > dueMoment) {
      alert('Please check date again');
    } else {
      this.props.taskFunc.Update(this.props.task.id, 'startDate', dateString);
    }
  };

  handleDueDateChange = (date, dateString) => {
    const startMoment = moment(this.props.task.startDate, 'YYYY-MM-DD');
    const dueMoment = moment(dateString, 'YYYY-MM-DD');
    if (startMoment > dueMoment) {
      alert('Please check date again');
    } else {
      this.props.taskFunc.Update(this.props.task.id, 'dueDate', dateString);
    }
  };

  render() {
    return (
      <React.Fragment>
        <EditableTextareaPC
          body={this.props.task.title}
          keyType={'title'}
          datatype={'task'}
          editfunc={this.props.taskFunc.Update}
          {...this.props}
        />
        <EditableTextareaPC
          body={this.props.task.body}
          keyType={'body'}
          datatype={'task'}
          editfunc={this.props.taskFunc.Update}
          {...this.props}
        />
        <div>
          <Button onClick={this.showConfirm}>Confirm</Button>
          <Button onClick={this.showDeleteConfirm} type="dashed">
            Delete
          </Button>
        </div>

        <UserSearchBar taskId={this.props.task.id} {...this.props} />

        <LabelSearchBar taskId={this.props.task.id} {...this.props} />

        <div>
          start date:
          <DatePicker
            onChange={this.handleStartDateChange}
            value={moment(this.props.task.startDate, 'YYYY-MM-DD')}
          />
          due date:
          <DatePicker
            onChange={this.handleDueDateChange}
            value={moment(this.props.task.dueDate, 'YYYY-MM-DD')}
          />
        </div>
        <ActivityPC {...this.props} />
      </React.Fragment>
    );
  }
}

export default CardViewTaskModalPC;
