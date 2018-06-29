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
      // {
      //   id: 2,
      //   userID: 1,
      //   admin: false,
      //   name: 'fds-team2',
      // },
      // {
      //   id: 3,
      //   userID: 2,
      //   admin: true,
      //   name: 'syami team1',
      // },
      // {
      //   id: 4,
      //   userID: 2,
      //   admin: true,
      //   name: 'syami team2',
      // },
    ],
    loading: false,
    current: 0,
  };

  async componentDidMount() {
    const id = parseInt(this.props.id, 10);
    this.changeCurrent(id);
    await this.fetchData();
  }

  async fetchData() {
    this.setState({
      loading: true,
    });
    try {
      const res = await serverAPI.get(`/team-assignees/?_expand=team`);
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
  }

  createTeam = async (userID, teamname) => {
    const prevState = this.state.teams.concat();
    try {
      this.setState({ loading: true });
      const res = await serverAPI.post('/teams', { teamname });
      console.log(res.data, res.data.id);
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
