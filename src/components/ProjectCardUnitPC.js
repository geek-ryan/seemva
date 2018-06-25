import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal } from 'antd';
import CardViewTaskUnitPC from './CardViewTaskUnitPC';
import CardViewAddTaskPC from './CardViewAddTaskPC';

import CardViewTaskModalPC from './CardViewTaskModalPC';

import '../../node_modules/antd/dist/antd.css';

import { TaskProvider, TaskConsumer } from '../contexts/TaskCTX';

class ProjectCardUnitPC extends Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
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
        <CardViewAddTaskPC onClick={this.showModal} />
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <CardViewTaskModalPC {...this.props} />
        </Modal>
      </React.Fragment>
    );
  }
}

export default ProjectCardUnitPC;
