import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class ProjectProvider extends Component {
  state = {
    target: '',
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
      const res = await serverAPI.get(`/projects`);
      this.setState({
        projects: res.data,
        loading: false,
        teamid: this.props.teamCurrent,
      });
      this.teamFilter(this.props.teamCurrent);
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };

  shouldComponentUpdate = () => {
    return true;
  };

  teamFilter = async id => {
    const res = await serverAPI.get(`/projects`);
    let brr = res.data.filter(element => element.teamId === parseInt(id));
    this.setState({ projects: brr });
  };

  Create = async o => {
    try {
      const res = await serverAPI.post('/projects', o);
      const get = await serverAPI.get('/projects');
      this.setState({
        projects: get.data,
        loading: false,
        target: res.data.id,
      });
    } catch (e) {
      const get = await serverAPI.get('/activities');
      this.setState({
        activities: get.data,
        loading: false,
        target: '',
      });
    }
  };

  Update = async (id, keyType, body) => {
    this.setState({ loading: true });
    try {
      const res = await serverAPI.patch(`/projects/${id}`, {
        [keyType]: body,
      });
      const get = await serverAPI.get('/projects');
      this.setState({
        projects: get.data,
        loading: false,
        target: '',
      });
    } catch (e) {
      const get = await serverAPI.get('/activities');
      this.setState({
        activities: get.data,
        loading: false,
        target: '',
      });
    }
  };

  render() {
    const value = {
      projectState: this.state,
      projectFunc: {
        Create: this.Create,
        Update: this.Update,
        teamFilter: this.teamFilter,
      },
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { ProjectProvider, Consumer as ProjectConsumer };
