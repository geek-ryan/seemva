import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class TaskProvider extends Component {
  state = {
    tasks: [
      // {
      //   id: 1,
      //   teamId: 1,
      //   projectId: 1,
      //   title: 'title 1',
      //   body: '11',
      //   startDate: '2018-01-01',
      //   dueDate: '2018-01-01',
      //   complete: true,
      // },
    ],
  };

  fetchData = async teamID => {
    const res = await serverAPI.get(`/teams/${teamID}/tasks`);
    this.setState({
      tasks: res.data,
    });
  };

  async componentDidMount() {
    await this.fetchData(this.props.teamID);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.teamID !== prevProps.teamID) {
      await this.fetchData(this.props.teamID);
    }
  }

  Complete = async (id, complete) => {
    await serverAPI.patch(`/tasks/${id}`, {
      complete: !complete,
    });
    await this.fetchData(this.props.teamID);
  };

  Create = async o => {
    await serverAPI.post('/tasks', o);
    await this.fetchData(this.props.teamID);
  };

  Delete = async id => {
    await serverAPI.delete(`/tasks/${id}`);
    await this.fetchData(this.props.teamID);
  };

  Update = async (id, keyType, body) => {
    await serverAPI.patch(`/tasks/${id}`, {
      [keyType]: body,
    });
    await this.fetchData(this.props.teamID);
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
