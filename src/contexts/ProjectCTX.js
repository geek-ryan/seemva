import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext();

class ProjectProvider extends Component {
  state = {
    projects: [
      {
        id: 1,
        userId: 1,
        teamId: 1,
        title: 'project 1',
        subtitle: 'project subtitle 1',
      },
      {
        id: 2,
        userId: 1,
        teamId: 1,
        title: 'project 2',
        subtitle: 'project subtitle 2',
      },
    ],
  };

  render() {
    const value = this.state.projects;
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { ProjectProvider, Consumer as ProjectConsumer };
