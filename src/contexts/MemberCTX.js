import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class MemberProvider extends Component {
  static defaultProps = {
    teamID: 0,
  };

  state = {
    loading: false,
    users: [],
    members: [],
    matchUsers: [],
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

  fetchData = async teamID => {
    const resUser = await serverAPI.get(`/users`);
    this.setState({
      users: resUser.data,
    });
    const resAssignees = await serverAPI.get(`/teams/${teamID}/team-assignees`);
    const idArr = resAssignees.data.map(item => item.userId);
    this.setState({
      members: resUser.data.filter(user => idArr.includes(user.id)),
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
    await this.fetchData(this.props.teamID);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.teamID !== prevProps.teamID) {
      await this.fetchData(this.props.teamID);
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
