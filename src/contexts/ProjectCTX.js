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

  handleAddProject = o => {
    const arr = this.state.projects.map();
    const num = arr.sort((a, b) => b.id - a.id)[0].id + 1;
    const obj = { ...o, id: num };
    arr.push(obj);
    this.setState({ projects: arr });
  };

  render() {
    const value = this.state;
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { ProjectProvider, Consumer as ProjectConsumer };
