import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import CardViewTaskUnitPC from './CardViewTaskUnitPC';
import CardViewAddTaskPC from './CardViewAddTaskPC';

import { TaskProvider, TaskConsumer } from '../contexts/TaskCTX';

class ProjectCardUnitPC extends Component {
  render() {
    return (
      <React.Fragment>
        <TaskConsumer>
          <h1>Project Title</h1>
          {value => value.map(Task => <CardViewTaskUnitPC key={Task.id} />)}
          <CardViewAddTaskPC />
        </TaskConsumer>
      </React.Fragment>
    );
  }
}

export default ProjectCardUnitPC;
