import React, { Component } from 'react';

import MemberGroupPC from '../utils/MemberGroupPC';
import serverAPI from '../../serverAPI';

class HeaderPC extends Component {
  static defaultProps = {
    teamID: 1,
    teamname: 'team1',
  };

  state = {
    loading: false,
    q: '',
    users: [],
    members: [],
    matchUsers: [],
  };

  changeQuery = e => {
    this.setState({ q: e.target.value }, () => {
      this.autocompleteSearch(this.state.q);
    });
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

  componentDidMount() {
    this.fetchData(this.props.teamID);
  }

  render() {
    const { teamID, teamname } = this.props;
    return (
      <header className="header">
        <h2 className="header__team-name">
          {teamname ? teamname : 'welcome team'}
        </h2>
        <MemberGroupPC
          teamID={teamID}
          {...this.state}
          onChangeQuery={this.changeQuery}
        />
      </header>
    );
  }
}
export default HeaderPC;
