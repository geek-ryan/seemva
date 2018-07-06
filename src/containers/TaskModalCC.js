import React, { Component } from 'react';

import TaskModalPC from '../components/cardview/TaskModalPC';

class TaskModalCC extends Component {
  taskModalDueDateChange = (date, dateString) => {
    this.props.taskFunc.Update(this.props.task.id, 'startDate', dateString[0]);
    this.props.taskFunc.Update(this.props.task.id, 'dueDate', dateString[1]);
  };

  render() {
    return (
      <TaskModalPC
        {...this.props}
        taskModalDueDateChange={this.taskModalDueDateChange}
      />
    );
  }
}

export default TaskModalCC;
