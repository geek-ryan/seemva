import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext();

class TaskProvider extends Component {
  state = {
    tasks: [
      {
        id: 1,
        projectId: 1,
        title: 'title 1',
        body: '11',
        startDate: '2018.01.01',
        dueDate: '2018.01.01',
        complete: true,
      },
      {
        id: 2,
        projectId: 1,
        title: 'title 2',
        body: '22',
        startDate: '2018.01.01',
        dueDate: '2018.01.01',
        complete: false,
      },
      {
        id: 3,
        projectId: 1,
        title: 'title 3',
        body: '33',
        startDate: '2018.01.01',
        dueDate: '2018.01.01',
        complete: false,
      },
      {
        id: 4,
        projectId: 2,
        title: 'title 4',
        body: '44',
        startDate: '2018.01.01',
        dueDate: '2018.01.01',
        complete: false,
      },
      {
        id: 5,
        projectId: 2,
        title: 'title 5',
        body: '55',
        startDate: '2018.01.01',
        dueDate: '2018.01.01',
        complete: false,
      },
    ],
  };

  handleComplete = id => {
    this.setState(() => {
      const arr = this.state.tasks.map(
        task => (task.id === id ? { ...task, complete: true } : task)
      );
      return { tasks: arr };
    });
  };

  handleDelete = id => {
    this.setState(() => {
      const arr = this.state.tasks.map(task => (task.id === id ? '' : task));
      return { tasks: arr };
    });
  };

  render() {
    const value = {
      tasks: this.state.tasks,
      handleComplete: this.handleComplete,
      handleDelete: this.handleDelete,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { TaskProvider, Consumer as TaskConsumer };
