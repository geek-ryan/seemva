import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class TaskProvider extends Component {
  state = {
    loading: false,
    target: '',
    tasks: [
      {
        id: 1,
        projectId: 1,
        title: 'title 1',
        body: '11',
        startDate: '2018-01-01',
        dueDate: '2018-01-01',
        complete: true,
      },
      {
        id: 2,
        projectId: 1,
        title: 'title 2',
        body: '22',
        startDate: '2018-01-01',
        dueDate: '2018-01-01',
        complete: false,
      },
      {
        id: 3,
        projectId: 1,
        title: 'title 3',
        body: '33',
        startDate: '2018-01-01',
        dueDate: '2018-01-01',
        complete: false,
      },
      {
        id: 4,
        projectId: 2,
        title: 'title 4',
        body: '44',
        startDate: '2018-01-01',
        dueDate: '2018-01-01',
        complete: false,
      },
      {
        id: 5,
        projectId: 2,
        title: 'title 5',
        body: '55',
        startDate: '2018-01-01',
        dueDate: '2018-01-01',
        complete: false,
      },
    ],
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      const res = await serverAPI.get('/tasks');
      this.setState({ tasks: res.data, loading: false });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
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
        Update: this.Update,
      },
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { TaskProvider, Consumer as TaskConsumer };
