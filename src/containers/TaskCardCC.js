import React, { Component } from 'react';
import { Modal } from 'antd';

import TaskCardPC from '../components/cardview/TaskCardPC';
import withTeamMember from '../hocs/withTeamMember';
import withLabel from '../hocs/withLabel';

import { deleteTask, updateTask } from '../actions';
import { connect } from 'react-redux';
import { currentTask } from '../actions';

class TaskCardCC extends Component {
  static defaultProps = {
    dispatch: () => console.log('dispatch'),
    task: { id: 0 },
  };

  state = {
    visible: false,
    taskLabels: [],
    taskMembers: [],
  };

  componentDidMount = () => {
    const taskId = this.props.task.id;

    let taskLabels = [];
    const labels = this.props.labels.slice();
    const assignees = this.props.labelTaskAssignees.slice();
    labels.forEach(label =>
      assignees.forEach(
        assignee =>
          label.id === assignee.labelId &&
          taskId === assignee.taskId &&
          taskLabels.push(label)
      )
    );

    let taskMembers = [];
    const users = this.props.users.slice();
    const assignees2 = this.props.taskUserAssignees.slice();
    users.forEach(user =>
      assignees2.forEach(
        assignee =>
          user.id === assignee.userId &&
          taskId === assignee.taskId &&
          taskMembers.push(user)
      )
    );

    this.setState({ taskLabels, taskMembers });
  };

  // handleSetCurrentTask = () => {
  //   this.props.dispatch(currentTask(this.props.task.id));
  // };

  taskShowModal = () => {
    this.setState({
      visible: true,
    });
  };

  taskOk = e => {
    this.setState({
      visible: false,
    });
  };

  taskCancel = e => {
    this.setState({
      visible: false,
    });
  };

  taskDeleteConfirm = () => {
    const Delete = () => this.props.dispatch(deleteTask(this.props.task.id));
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

  taskCompleteToggle = () => {
    this.props.dispatch(
      updateTask(this.props.task.id, { complete: !this.props.task.complete })
    );
    // this.props.taskFunc.Complete(this.props.task.id, this.props.task.complete);
  };

  render() {
    return (
      <TaskCardPC
        {...this.props}
        taskMembers={this.state.taskMembers}
        taskLabels={this.state.taskLabels}
        taskModal={this.state}
        taskShowModal={this.taskShowModal}
        taskOk={this.taskOk}
        taskCancel={this.taskCancel}
        taskDeleteConfirm={this.taskDeleteConfirm}
        taskCompleteToggle={this.taskCompleteToggle}
        // onSetCurrentTask={this.handleSetCurrentTask}
      />
    );
  }
}

const pullingMembers = state => {
  // const userArr = state.userReducer.slice();
  // const assigneeArr = state.taskUserAssigneeReducer.slice();
  // const filteredAssigneeArr = assigneeArr.filter(
  //   el => el.taskId === state.currentReducer.taskId
  // );
  // const result = [];
  // userArr.forEach(user =>
  //   filteredAssigneeArr.forEach(assignee => {
  //     user.id === assignee.userId && result.push(user);
  //   })
  // );
  return {
    taskUserAssignees: state.taskUserAssigneeReducer,
    users: state.userReducer,
  };
};

// const pullingTaskLabels = state => {
//   const labelArr = state.labelReducer.slice();
//   const assigneeArr = state.labelTaskAssigneeReducer.slice();
//   const filteredAssigneeArr = assigneeArr.filter(
//     el => el.taskId === state.currentReducer.taskId
//   );
//   const result = labelArr.filter(el => {
//     return filteredAssigneeArr.filter(ele => {
//       return el.id === ele.labelId;
//     });
//   });
//   return { taskLabels: result };
// };

const pullingLabels = state => {
  return {
    labels: state.labelReducer,
    labelTaskAssignees: state.labelTaskAssigneeReducer,
  };
};

const pullingTaskActivity = state => {
  const activityArr = state.activityReducer.slice();
  return { activities: activityArr };
};

const combiner = state => {
  const aaa = pullingMembers(state);
  const bbb = pullingLabels(state);
  const ccc = pullingTaskActivity(state);
  return { ...aaa, ...bbb, ...ccc };
};

export default connect(combiner)(TaskCardCC);
