import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class MemberProvider extends Component {
  static defaultProps = {
    teamMembers: [],
    taskID: 0,
  };

  state = {
    loading: false,
    members: [], // 태스크의 멤버
    matchUsers: [], // 검색어에 일치하는 유저
  };

  autocompleteSearch = Q => {
    const q = Q.toLowerCase();
    const match = this.props.teamMembers.filter(member =>
      member.username.toLowerCase().includes(q)
    );
    q
      ? this.setState({ matchUsers: match })
      : this.setState({ matchUsers: [] });
  };

  fetchMatchData = async teamID => {
    this.setState({
      loading: true,
    });
    const resAssignees = await serverAPI.get(`/teams/${teamID}/team-assignees`);
    const idArr = resAssignees.data.map(item => item.userId);
    this.setState({
      members: this.state.users.filter(user => idArr.includes(user.id)),
      loading: false,
    });
  };

  addMember = async user => {
    try {
      this.setState(prevState => ({
        members: prevState.members.concat({
          ...user,
        }),
      }));
      await serverAPI.post(`/team-assignees`, {
        userId: user.id,
        teamId: this.props.teamID,
        admin: false,
      });
    } catch (e) {
      // 오류 작업 일괄 작업 예정
    }
  };

  clearMatch = () => {
    this.setState({
      matchUsers: [],
    });
  };

  render() {
    const value = {
      ...this.state,
      autocompleteSearch: this.autocompleteSearch,
      addMember: this.addMember,
      clearMatch: this.clearMatch,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { MemberProvider, Consumer as MemberConsumer };
