import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import CardViewTaskUnitPC from './CardViewTaskUnitPC';
import CardViewAddTaskPC from './CardViewAddTaskPC';

import '../../node_modules/antd/dist/antd.css';

import { TaskProvider, TaskConsumer } from '../contexts/TaskCTX';

class ProjectCardUnitPC extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>{this.props.title}</h1>
        <TaskConsumer>
          {({ tasks, handleComplete, handleDelete }) => {
            // console.log(this.props.id);
            return tasks.map(task => {
              // console.log(Task.projectId);
              return this.props.id === task.projectId ? (
                <CardViewTaskUnitPC
                  key={task.id}
                  onComplete={handleComplete}
                  onDelete={handleDelete}
                  {...task}
                />
              ) : (
                ''
              );
            });
          }}
        </TaskConsumer>
        <CardViewAddTaskPC />
      </React.Fragment>
    );
  }
}

export default ProjectCardUnitPC;
