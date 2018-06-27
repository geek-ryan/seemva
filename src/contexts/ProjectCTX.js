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
    const arr = this.state.projects.slice();
    const brr = this.state.projects.slice();
    const num = arr.sort((a, b) => b.id - a.id)[0].id + 1;
    const obj = { ...o, id: num };
    brr.push(obj);
    this.setState({ projects: brr });
  };

  render() {
    const value = {
      value: this.state,
      projects: this.state.projects,
      handleAddProject: this.handleAddProject,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { ProjectProvider, Consumer as ProjectConsumer };
