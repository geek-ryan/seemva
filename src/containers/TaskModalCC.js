import React, { Component } from 'react';
import moment from 'moment';

import TaskModalPC from '../components/cardview/TaskModalPC';

class TaskModal extends Component {
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
      <TaskModalPC
        {...this.props}
        // taskModal={this.state}
        taskModalStartDateChange={this.taskModalStartDateChange}
        taskModalDueDateChange={this.taskModalDueDateChange}
      />
    );
  }
}

export default TaskModal;
