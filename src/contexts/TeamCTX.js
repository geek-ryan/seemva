import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class TeamProvider extends Component {
  state = {
    teams: [
      // {
      //   id: 1,
      //   userID: 1,
      //   admin: true,
      //   name: 'team1',
      // },
    ],
    loading: false,
    current: 0,
  };

  async componentDidMount() {
    const id = parseInt(this.props.id, 10);
    this.changeCurrent(id);
    const res = await serverAPI.get('/me');
    await this.fetchData(res.data.id);
  }

  fetchData = async userID => {
    this.setState({
      loading: true,
    });
    try {
      const res = await serverAPI.get(
        `/team-assignees?userId=${userID}&_expand=team`
      );
      const teams = res.data.map(assignee => ({
        id: assignee.team.id,
        userID: assignee.userId,
        admin: assignee.admin,
        name: assignee.team.teamname,
      }));
      this.setState({
        teams,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  createTeam = async (userID, teamname) => {
    const prevState = this.state.teams.concat();
    try {
      this.setState({ loading: true });
      const res = await serverAPI.post('/teams', { teamname });
      this.setState(prevState => ({
        teams: prevState.teams.concat({
          id: res.data.id,
          userID: userID,
          admin: true,
          name: teamname,
        }),
        loading: false,
      }));
      await serverAPI.post('/team-assignees', {
        userId: userID,
        admin: true,
        teamId: res.data.id,
      });
    } catch (e) {
      this.setState({
        teams: prevState,
        loading: false,
      });
    }
  };

  changeCurrent = id => {
    this.setState({
      current: id,
    });
  };

  render() {
    const value = {
      ...this.state,
      createTeam: this.createTeam,
      changeCurrent: this.changeCurrent,
    };

    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { TeamProvider, Consumer as TeamConsumer };
