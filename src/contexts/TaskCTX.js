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
        complete: false,
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

  render() {
    const value = {
      tasks: this.state.tasks,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { TaskProvider, Consumer as TaskConsumer };
