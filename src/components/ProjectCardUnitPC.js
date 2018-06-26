import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal, Card } from 'antd';

import CardViewTaskUnitPC from './CardViewTaskUnitPC';
import CardViewAddTaskPC from './CardViewAddTaskPC';
import CardViewTaskModalPC from './CardViewTaskModalPC';
import EditableTextareaPC from './EditableTextareaPC';

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
        <Card style={{ width: 400 }}>
          <EditableTextareaPC body={this.props.title} />
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
          <div onClick={this.showModal}>
            <Icon type="plus" /> Add New Task
          </div>
          <Modal
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <CardViewTaskModalPC {...this.props} />
          </Modal>
        </Card>
      </React.Fragment>
    );
  }
}

export default ProjectCardUnitPC;
