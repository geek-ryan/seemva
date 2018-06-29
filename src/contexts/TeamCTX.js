import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class TeamProvider extends Component {
  state = {
    teams: [
      {
        id: 1,
        userID: 1,
        admin: true,
        name: 'team1',
      },
      {
        id: 2,
        userID: 1,
        admin: false,
        name: 'fds-team2',
      },
      {
        id: 3,
        userID: 2,
        admin: true,
        name: 'syami team1',
      },
      {
        id: 4,
        userID: 2,
        admin: true,
        name: 'syami team2',
      },
    ],
    loading: false,
    current: 0,
  };

  async componentDidMount() {
    await this.fetchData();
  }

  fetchData = async () => {
    const id = parseInt(this.props.id, 10);
    try {
      const res = await serverAPI.get(`/team-assignees?_expand=teams`);
      const teams = res.data.map(() => {});
      this.setState({
        teams,
        loading: true,
      });
    } finally {
      this.setState({
        loading: false,
        current: id,
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
      initialize: this.initialize,
      changeCurrent: this.changeCurrent,
    };

    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { TeamProvider, Consumer as TeamConsumer };
