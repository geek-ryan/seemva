import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext();

class UserProvider extends Component {
  state = {
    users: [
      {
        id: 1,
        username: 'fds',
      },
      {
        username: 'loki',
        id: 2,
      },
      {
        username: 'jojo',
        id: 3,
      },
    ],
    user_tasks: [
      {
        id: 1,
        userId: 1,
        taskId: 1,
      },
      {
        id: 2,
        userId: 1,
        taskId: 2,
      },
      {
        id: 3,
        userId: 1,
        taskId: 3,
      },
      {
        id: 4,
        userId: 2,
        taskId: 1,
      },
      {
        id: 5,
        userId: 2,
        taskId: 2,
      },
      {
        id: 6,
        userId: 3,
        taskId: 4,
      },
      {
        id: 7,
        userId: 3,
        taskId: 5,
      },
      {
        id: 8,
        userId: 2,
        taskId: 4,
      },
      {
        id: 9,
        userId: 1,
        taskId: 5,
      },
    ],
  };

  render() {
    const value = {
      value: this.state,
      users: this.state.users,
      user_tasks: this.state.user_tasks,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { UserProvider, Consumer as UserConsumer };
