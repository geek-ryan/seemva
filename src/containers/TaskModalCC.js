import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

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

  taskModalDueDateChange = (date, dateString) => {
    this.props.taskFunc.Update(this.props.task.id, 'startDate', dateString[0]);
    this.props.taskFunc.Update(this.props.task.id, 'dueDate', dateString[1]);
  };

  render() {
    const { paramId, taskId } = this.props;
    const { cancelled } = this.state;
    // const taskOk2 = () => {
    //   taskOk();
    //   this.handleCancle();
    // };

    // console.log('hahah', parseInt(paramId), taskId);

    return cancelled ? (
      <Redirect to={`${this.props.url}`} />
    ) : (
      parseInt(paramId, 10) === taskId && (
        <TaskModalPC
          {...this.props}
          modalCancle={this.handleCancle}
          taskModal={this.state}
          taskModalDueDateChange={this.taskModalDueDateChange}
        />
      )
    );
  }
}

export default TaskModalCC;
