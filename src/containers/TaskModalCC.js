import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import TaskModalPC from '../components/cardview/TaskModalPC';

import { updateTask, currentTask } from '../actions';
import { connect } from 'react-redux';

class TaskModalCC extends Component {
  state = {
    cancelled: false,
  };

  componentDidMount = () => {
    this.props.dispatch(currentTask(this.props.task.id));
  };

  handleCancle = () => {
    this.setState({
      cancelled: true,
    });
  };

  taskModalDueDateChange = (date, dateString) => {
    this.props.dispatch(
      updateTask(this.props.task.id, {
        startDate: dateString[0],
        dueDate: dateString[1],
      })
    );
    // this.props.taskFunc.Update(this.props.task.id, 'startDate', dateString[0]);
    // this.props.taskFunc.Update(this.props.task.id, 'dueDate', dateString[1]);
  };

  render() {
    const { paramId, taskId } = this.props;
    const { cancelled } = this.state;
    // const taskOk2 = () => {
    //   taskOk();
    //   this.handleCancle();
    // };

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

export default connect()(TaskModalCC);
