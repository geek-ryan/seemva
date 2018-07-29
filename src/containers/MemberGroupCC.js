import React, { Component } from 'react';
// import serverAPI from '../serverAPI';

import MemberGroupPC from '../components/utils/MemberGroupPC';
import { connect } from 'react-redux';
import { deleteTaskUserAssignee, createTaskUserAssignee } from '../actions';

class MemberGroupCC extends Component {
  state = {
    loading: false,
    taskMembers: [],
    matchUsers: [],
  };

  autocompleteSearch = Q => {
    const q = Q.toLowerCase();
    const match = this.props.teamMembers.filter(member =>
      member.username.toLowerCase().includes(q)
    );
    q
      ? this.setState({ matchUsers: match })
      : this.setState({ matchUsers: this.props.teamMembers });
  };

  // fetchMatchData = async taskID => {
  //   this.setState({
  //     loading: true,
  //   });
  // const resAssignees = await serverAPI.get(
  //   `/tasks/${taskID}/task-user-assignees`
  // );
  // const idArr = resAssignees.data.map(item => item.userId);
  //   this.setState({
  //     taskMembers: this.props.teamMembers.filter(member =>
  //       idArr.includes(member.id)
  //     ),
  //     loading: false,
  //   });
  // };

  addMember = (user, taskID = this.props.task.id) => {
    this.props.dispatch(
      createTaskUserAssignee({
        userId: user.id,
        taskId: taskID,
      })
    );

    // await serverAPI.post(`/task-user-assignees`, {
    //   userId: user.id,
    //   taskId: taskID,
    // });
    // await this.fetchMatchData(taskID);
  };

  clearMatch = () => {
    this.setState({
      matchUsers: [],
    });
  };

  removeMember = (id, taskID = this.props.task.id) => {
    let assigneeId = '';
    this.props.taskUserAssignees.forEach(
      assignee =>
        assignee.userId === id &&
        assignee.taskId === taskID &&
        (assigneeId = assignee.id)
    );
    this.props.dispatch(deleteTaskUserAssignee(assigneeId));

    // const res = await serverAPI.get(
    //   `/task-user-assignees?taskId=${taskID}&userId=${id}`
    // );
    // await serverAPI.delete(`/task-user-assignees/${res.data[0].id}`);
    // await this.fetchMatchData(taskID);
  };

  componentDidMount() {
    // await this.fetchMatchData(this.props.task.id);
    this.setState({
      // matchUsers: this.props.teamMembers,
      taskMembers: this.props.members,
    });
  }

  render() {
    const value = {
      ...this.state,
      autocompleteSearch: this.autocompleteSearch,
      onAddMember: this.addMember,
      onRemoveMember: this.removeMember,
      clearMatch: this.clearMatch,
      fetchMatchData: this.fetchMatchData,
    };
    return <MemberGroupPC {...this.props} {...value} />;
  }
}

const pullingTeamMembers = state => {
  const teamCurrent = state.currentReducer.teamId;
  const assignees = state.teamUserAssigneeReducer;
  const users = state.userReducer;
  let teamMembers = [];
  users.forEach(user =>
    assignees.forEach(
      assignee =>
        assignee.userId === user.id &&
        assignee.teamId === teamCurrent &&
        teamMembers.push(user)
    )
  );
  return { teamMembers: users };
};

const pullingTaskUser = state => {
  const assignees = state.taskUserAssigneeReducer;
  const users = state.userReducer;
  const taskCurrent = state.currentReducer.taskId;
  let taskMembers = [];
  users.forEach(user =>
    assignees.forEach(
      assignee =>
        assignee.userId === user.id &&
        assignee.taskId === taskCurrent &&
        taskMembers.push(user)
    )
  );
  return { members: taskMembers };
};

const combine = state => {
  const aaa = pullingTeamMembers(state);
  const bbb = pullingTaskUser(state);
  return { ...aaa, ...bbb };
};

export default connect(combine)(MemberGroupCC);
