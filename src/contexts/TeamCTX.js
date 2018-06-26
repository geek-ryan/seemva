import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext();

class TeamProvider extends Component {
  state = {
    teams: [
      {
        id: 1,
        teamname: 'para',
      },
      {
        id: 2,
        teamname: 'sub',
      },
    ],
  };

  render() {
    const value = this.state;
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { TeamProvider, Consumer as TeamConsumer };
