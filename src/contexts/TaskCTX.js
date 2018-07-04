import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class TaskProvider extends Component {
  state = {
    loading: false,
    target: '',
    tasks: [],
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      // this.projectFilter(this.props.teamCurrent);
      const res = await serverAPI.get(`/tasks`);
      this.setState({
        tasks: res.data,
        loading: false,
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };

  projectFilter = async id => {
    const res = await serverAPI.get(`/tasks`);
    let brr = res.data.filter(element => element.projectId === parseInt(id));
    this.setState({ tasks: brr });
    console.log('project filter', id, brr);
  };

  Complete = async id => {
    this.setState({ loading: true });
    try {
      const res = await serverAPI.patch(`/tasks/${id}`, {
        complete: true,
      });
      const get = await serverAPI.get('/tasks');
      this.setState({
        tasks: get.data,
        loading: false,
      });
    } catch (e) {
      const get = await serverAPI.get('/tasks');
      this.setState({
        tasks: get.data,
        loading: false,
      });
    }
  };

  Create = async o => {
    try {
      const res = await serverAPI.post('/tasks', o);
      const get = await serverAPI.get('/tasks');
      this.setState({ tasks: get.data, loading: false, target: get.data.id });
    } catch (e) {
      const get = await serverAPI.get('/tasks');
      this.setState({
        tasks: get.data,
        loading: false,
        target: '',
      });
    }
  };

  Delete = async id => {
    this.setState({ loading: true });
    try {
      const res = await serverAPI.delete(`/tasks/${id}`);
      const get = await serverAPI.get('/tasks');
      this.setState({
        tasks: get.data,
        loading: false,
        target: '',
      });
    } catch (e) {
      const get = await serverAPI.get('/tasks');
      this.setState({
        tasks: get.data,
        loading: false,
        target: '',
      });
    }
  };

  Update = async (id, keyType, body) => {
    this.setState({ loading: true });
    try {
      const res = await serverAPI.patch(`/tasks/${id}`, {
        [keyType]: body,
      });
      const get = await serverAPI.get('/tasks');
      this.setState({
        tasks: get.data,
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
      taskState: this.state,
      taskFunc: {
        Complete: this.Complete,
        Delete: this.Delete,
        Create: this.Create,
        projectFilter: this.projectFilter,
        Update: this.Update,
      },
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { TaskProvider, Consumer as TaskConsumer };
