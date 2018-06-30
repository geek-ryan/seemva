import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class TaskProvider extends Component {
  state = {
    loading: false,
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

  Complete = async id => {
    this.setState({ loading: true });
    try {
      this.setState(() => {
        const arr = this.state.tasks.map(
          task => (task.id === id ? { ...task, complete: true } : task)
        );
        return { tasks: arr, loding: false };
      });
      const res = await serverAPI.patch(`/tasks/${id}`, {
        complete: true,
      });
    } catch (e) {
      this.setState(prevState => ({
        tasks: prevState.tasks,
        loading: false,
      }));
    }
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

  Delete = async id => {
    this.setState({ loading: true });
    try {
      this.setState(() => {
        const arr = this.state.tasks.map(task => (task.id === id ? '' : task));
        return { tasks: arr, loding: false };
      });
      const res = await serverAPI.delete(`/tasks/${id}`);
    } catch (e) {
      this.setState(prevState => ({
        tasks: prevState.tasks,
        loading: false,
      }));
    }
  };

  Create = async o => {
    try {
      const pre = this.state.tasks.slice();
      const res = await serverAPI.post('/tasks', o);
      pre.push(res.data);
      this.setState({ tasks: pre, loading: false });
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
        return { tasks: brr };
      });
      const res = await serverAPI.patch(`/tasks/${id}`, {
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
      taskState: this.state,
      taskFunc: {
        Complete: this.Complete,
        Delete: this.Delete,
        Create: this.Create,
        Update: this.Update,
      },

      // tasks: this.state.tasks,
      // handleComplete: this.handleComplete,
      // handleDeleteTask: this.handleDeleteTask,
      // handleAddTask: this.handleAddTask,
      // handleEditTask: this.handleEditTask,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { TaskProvider, Consumer as TaskConsumer };
