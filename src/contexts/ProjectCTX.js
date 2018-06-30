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

  Create = o => {
    const arr = this.state.projects.slice();
    const brr = this.state.projects.slice();
    const num = arr.sort((a, b) => b.id - a.id)[0].id + 1;
    const obj = { ...o, id: num };
    brr.push(obj);
    this.setState({ projects: brr });
  };

  Update = (id, keyType, body) => {
    this.setState(() => {
      let arr = this.state.projects.slice();
      const brr = arr.map(
        element =>
          element.id === parseInt(id)
            ? { ...element, [keyType]: body }
            : element
      );
      return { projects: brr };
    });
  };

  render() {
    const value = {
      projectState: this.state,
      projectFunc: {
        Create: this.Create,
        Update: this.Update,
      },

      // value: this.state,
      // projects: this.state.projects,
      // handleAddProject: this.handleAddProject,
      // handleEditProject: this.handleEditProject,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { ProjectProvider, Consumer as ProjectConsumer };
