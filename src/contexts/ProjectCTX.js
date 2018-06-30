import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class ProjectProvider extends Component {
  state = {
    loading: false,
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

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      const res = await serverAPI.get('/projects');
      this.setState({ projects: res.data, loading: false });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };

  Create = async o => {
    try {
      const pre = this.state.projects.slice();
      const res = await serverAPI.post('/projects', o);
      pre.push(res.data);
      this.setState({ projects: pre, loading: false });
    } catch (e) {
      this.setState(prevState => ({
        tasks: prevState.tasks,
        loading: false,
      }));
    }
  };

  Update = async (id, keyType, body) => {
    this.setState({ loading: true });
    try {
      this.setState(() => {
        let arr = this.state.tasks.slice();
        const brr = arr.map(
          element =>
            element.id === parseInt(id)
              ? { ...element, [keyType]: body }
              : element
        );
        return { projects: brr };
      });
      const res = await serverAPI.patch(`/projects/${id}`, {
        [keyType]: body,
      });
    } catch (e) {
      this.setState(prevState => ({
        tasks: prevState.tasks,
        loading: false,
      }));
    }
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
