import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal, Card, DatePicker } from 'antd';

import CardViewTaskUnitPC from './CardViewTaskUnitPC';
import CardViewAddTaskPC from './CardViewAddTaskPC';
import CardViewTaskModalPC from '../taskmodal/CardViewTaskModalPC';
import EditableTextareaPC from '../utils/EditableTextareaPC';

import '../../../node_modules/antd/dist/antd.css';

import { TaskProvider, TaskConsumer } from '../../contexts/TaskCTX';

class ProjectCardUnitPC extends Component {
  state = {
    visible: false,
    title: '',
    body: '',
    startDate: '2018-06-06',
    dueDate: '2018-06-06',
  };

  handleChangeTitle = e => {
    this.setState({ title: e.target.value });
    console.log(this.state.title);
  };
  handleChangeBody = e => {
    this.setState({ body: e.target.value });
    console.log(this.state.body);
  };

  // modal ----------------------
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log('click task ok');
    const obj = {
      title: this.state.title,
      body: this.state.body,
      startDate: this.state.startDate,
      dueDate: this.state.dueDate,
      projectId: this.props.id,
      complete: false,
    };
    this.props.onAdd(obj);
    this.setState({
      visible: false,
      title: '',
      body: '',
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
            {({ tasks, handleComplete, handleDelete, handleAddTask }) => {
              // console.log(this.props.id);
              return tasks.map(task => {
                // console.log(Task.projectId);
                return this.props.id === task.projectId ? (
                  <CardViewTaskUnitPC
                    key={task.id}
                    onComplete={handleComplete}
                    onDelete={handleDelete}
                    onAdd={handleAddTask}
                    {...task}
                    taskId={task.id}
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
            <Input onChange={this.handleChangeTitle} placeholder="Title" />
            <Input.TextArea
              onChange={this.handleChangeBody}
              placeholder="Body"
              row={4}
            />
            <div>2018-06-06 ~ 2018-06-06</div>
            <div>Member search input</div>
          </Modal>
        </Card>
      </React.Fragment>
    );
  }
}

export default ProjectCardUnitPC;
