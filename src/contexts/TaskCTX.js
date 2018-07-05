import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class TaskProvider extends Component {
  state = {
    tasks: [
      // {
      //   id: 1,
      //   projectId: 1,
      //   title: 'title 1',
      //   body: '11',
      //   startDate: '2018-01-01',
      //   dueDate: '2018-01-01',
      //   complete: true,
      // },
      // {
      //   id: 2,
      //   projectId: 1,
      //   title: 'title 2',
      //   body: '22',
      //   startDate: '2018-01-01',
      //   dueDate: '2018-01-01',
      //   complete: false,
      // },
      // {
      //   id: 3,
      //   projectId: 1,
      //   title: 'title 3',
      //   body: '33',
      //   startDate: '2018-01-01',
      //   dueDate: '2018-01-01',
      //   complete: false,
      // },
      // {
      //   id: 4,
      //   projectId: 2,
      //   title: 'title 4',
      //   body: '44',
      //   startDate: '2018-01-01',
      //   dueDate: '2018-01-01',
      //   complete: false,
      // },
      // {
      //   id: 5,
      //   projectId: 2,
      //   title: 'title 5',
      //   body: '55',
      //   startDate: '2018-01-01',
      //   dueDate: '2018-01-01',
      //   complete: false,
      // },
    ],
  };

  fetchData = async () => {
    const res = await serverAPI.get('/tasks');
    this.setState({ tasks: res.data });
  };

  async componentDidMount() {
    await this.fetchData();
  }

  Complete = async (id, complete) => {
    await serverAPI.patch(`/tasks/${id}`, {
      complete: !!complete,
    });
    await this.fetchData();
  };

  Create = async o => {
    await serverAPI.post('/tasks', o);
    await this.fetchData();
  };

  Delete = async id => {
    await serverAPI.delete(`/tasks/${id}`);
    await this.fetchData();
  };

  Update = async (id, keyType, body) => {
    await serverAPI.patch(`/tasks/${id}`, {
      [keyType]: body,
    });
    await this.fetchData();
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
