import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class TeamProvider extends Component {
  state = {
    // userId를 받아서 team-assignee의 정보와 일치할 경우 team의 정보를 받아옴
    teams: [
      {
        id: 1, // team의 id
        name: 'team1',
        admin: true,
      },
      {
        id: 2,
        name: 'fds-team2',
        admin: false,
      },
    ],
    loading: false,
    current: 0,
  };

  async componentDidMount() {
    const id = parseInt(this.props.id);
    this.setState({
      current: id,
    });
  }

  changeCurrent = id => {
    this.setState({
      current: id,
    });
  };

  render() {
    const value = {
      ...this.state,
      changeCurrent: this.changeCurrent,
    };

    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { TeamProvider, Consumer as TeamConsumer };
