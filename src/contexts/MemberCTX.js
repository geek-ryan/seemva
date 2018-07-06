import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class MemberProvider extends Component {
  static defaultProps = {
    teamID: 0,
  };

  state = {
    loading: false,
    users: [], // 가입한 모든 유저
    members: [], // 팀의 멤버
    matchUsers: [], // 검색어에 일치하는 유저
  };

  autocompleteSearch = Q => {
    const q = Q.toLowerCase();
    const match = this.state.users.filter(user =>
      user.username.toLowerCase().includes(q)
    );
    q
      ? this.setState({ matchUsers: match })
      : this.setState({ matchUsers: [] });
  };

  fetchUserData = async () => {
    this.setState({
      loading: true,
    });
    const resUser = await serverAPI.get(`/users`);
    this.setState({
      users: resUser.data,
      loading: false,
    });
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

  async componentDidMount() {
    await this.fetchUserData();
    await this.fetchMatchData(this.props.teamID);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.teamID !== prevProps.teamID) {
      await this.fetchMatchData(this.props.teamID);
    }
  }
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
