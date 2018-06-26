import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext();

class LabelProvider extends Component {
  state = {
    labels: [
      {
        id: 1,
        teamId: 1,
        color: 'red',
        body: 'label_01',
      },
      {
        id: 2,
        teamId: 1,
        color: 'blue',
        body: 'label_02',
      },
      {
        id: 3,
        teamId: 1,
        color: 'grean',
        body: 'label_03',
      },
    ],
    label_tasks: [
      {
        id: 1,
        labelId: 1,
        taskId: 1,
      },
      {
        id: 2,
        labelId: 2,
        taskId: 2,
      },
      {
        id: 3,
        labelId: 3,
        taskId: 3,
      },
      {
        id: 4,
        labelId: 1,
        taskId: 4,
      },
      {
        id: 5,
        labelId: 2,
        taskId: 5,
      },
      {
        id: 6,
        labelId: 3,
        taskId: 1,
      },
      {
        id: 7,
        labelId: 1,
        taskId: 2,
      },
    ],
  };

  render() {
    const value = this.state;
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { LabelProvider, Consumer as LabelConsumer };
