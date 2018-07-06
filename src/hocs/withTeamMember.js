import React, { Component } from 'react';
import { MemberConsumer } from '../contexts/MemberCTX';
import serverAPI from '../serverAPI';

const withTeamMember = WrappedComponent => {
  class MembersComponent extends Component {
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

    fetchMatchData = async taskID => {
      this.setState({
        loading: true,
      });
      const resAssignees = await serverAPI.get(
        `/tasks/${taskID}/task-user-assignees`
      );
      const idArr = resAssignees.data.map(item => item.userId);
      this.setState({
        taskMembers: this.props.teamMembers.filter(member =>
          idArr.includes(member.id)
        ),
        loading: false,
      });
    };

    addMember = async (user, taskID) => {
      await serverAPI.post(`/task-user-assignees`, {
        userId: user.id,
        taskId: taskID,
      });
      await this.fetchMatchData(taskID);
    };

    clearMatch = () => {
      this.setState({
        matchUsers: [],
      });
    };

    removeMember = async (id, taskID) => {
      const res = await serverAPI.get(
        `/task-user-assignees?taskId=${taskID}&userId=${id}`
      );
      await serverAPI.delete(`/task-user-assignees/${res.data[0].id}`);
      await this.fetchMatchData(taskID);
    };

    async componentDidMount() {
      await this.fetchMatchData(this.props.task.id);
      this.setState({
        matchUsers: this.props.teamMembers,
      });
    }

    render() {
      const value = {
        ...this.state,
        autocompleteSearch: this.autocompleteSearch,
        addMember: this.addMember,
        removeMember: this.removeMember,
        clearMatch: this.clearMatch,
        fetchMatchData: this.fetchMatchData,
      };
      return <WrappedComponent {...this.props} {...value} />;
    }
  }

  return class extends Component {
    render() {
      return (
        <MemberConsumer>
          {({ members }) => (
            <MembersComponent teamMembers={members} {...this.props} />
          )}
        </MemberConsumer>
      );
    }
  };
};

export default withTeamMember;
