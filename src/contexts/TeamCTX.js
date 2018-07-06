import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class TeamProvider extends Component {
  state = {
    userID: 0,
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
    const res = await serverAPI.get('/me');
    this.setState({ userID: res.data.id });
    await this.fetchData(this.state.userID);
    const id = parseInt(this.props.teamID, 10);
    this.changeCurrent(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.teamID !== prevProps.teamID) {
      const id = parseInt(this.props.teamID, 10);
      this.changeCurrent(id);
    }
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

  createTeam = async teamname => {
    const prevState = this.state.teams;
    try {
      this.setState({ loading: true });
      const res = await serverAPI.post('/teams', { teamname });
      this.setState(prevState => ({
        teams: prevState.teams.concat({
          id: res.data.id,
          userID: this.state.userID,
          admin: true,
          name: teamname,
        }),
        loading: false,
      }));
      await serverAPI.post('/team-assignees', {
        userId: this.state.userID,
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

  deleteTeam = async (teamID, admin) => {
    const prevState = this.state.teams;
    try {
      await serverAPI.delete(`/teams/${teamID}`);
      this.setState(prevState => ({
        teams: prevState.teams.filter(team => team.id !== teamID),
      }));
      const res = admin
        ? await serverAPI.get(`/team-assignees?teamId=${teamID}`)
        : await serverAPI.get(
            `/team-assignees?userId=${this.state.userID}&teamId=${teamID}`
          );
      for (const { id } of res.data) {
        await serverAPI.delete(`/team-assignees/${id}`);
      }
    } catch (e) {
      this.setState({
        teams: prevState,
        loading: false,
      });
    }
  };

  editTeam = async (teamID, teamname) => {
    const prevState = this.state.teams;
    try {
      this.setState({ loading: true });
      this.setState(prevState => ({
        teams: prevState.teams.map(
          team =>
            team.id === teamID
              ? {
                  id: teamID,
                  userID: this.state.userID,
                  admin: true,
                  name: teamname,
                }
              : team
        ),
        loading: false,
      }));
      await serverAPI.patch(`/teams/${teamID}`, { teamname });
    } catch (e) {
      this.setState({
        teams: prevState,
        loading: false,
      });
    }
  };

  changeCurrent = id => {
    this.setState({
      current: parseInt(id, 10),
    });
  };

  render() {
    const value = {
      ...this.state,
      createTeam: this.createTeam,
      editTeam: this.editTeam,
      deleteTeam: this.deleteTeam,
      changeCurrent: this.changeCurrent,
    };

    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { TeamProvider, Consumer as TeamConsumer };
