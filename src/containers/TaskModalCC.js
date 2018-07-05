import React, { Component } from 'react';
import moment from 'moment';
import { Modal } from 'antd';
import { Route, Link, Redirect } from 'react-router-dom';

// import CardViewTaskModalPC from '../components/taskmodal/CardViewTaskModalPC';
import TaskModalPC from '../components/cardview/TaskModalPC';

class TaskModalCC extends Component {
  state = {
    cancelled: false,
  };

  handleCancle = () => {
    console.log('cancle');
    this.setState({
      cancelled: true,
    });
  };

  handleUnitComplete = () => {
    this.props.taskFunc.Complete(this.props.task.id);
  };

  handleUnitDelete = () => {
    this.props.taskFunc.Delete(this.props.task.id);
  };

  taskModalDeleteConfirm = () => {
    const Delete = this.handleUnitDelete;
    Modal.confirm({
      title: 'Are you sure sure sure sure sure sure sure delete this task?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // console.log('delete shit');
        // this.props.taskCancle();
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
    const { paramId, teamId, taskId, taskOk } = this.props;
    const { cancelled } = this.state;
    const taskOk2 = () => {
      taskOk();
      this.handleCancle();
    };

    // console.log('hahah', parseInt(paramId), taskId);

    return cancelled ? (
      <Redirect to={`${this.props.url}`} />
    ) : (
      parseInt(paramId) === taskId && (
        <TaskModalPC
          modalCancle={this.handleCancle}
          taskModal={this.state}
          taskModalCompleteConfirm={this.taskModalCompleteConfirm}
          taskModalDeleteConfirm={this.taskModalDeleteConfirm}
          taskModalStartDateChange={this.taskModalStartDateChange}
          taskModalDueDateChange={this.taskModalDueDateChange}
          {...this.props}
        />
      )
    );
  }
}

export default TaskModalCC;
