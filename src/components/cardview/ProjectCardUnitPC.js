import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal, Card, DatePicker } from 'antd';

import CardViewTaskUnitPC from './CardViewTaskUnitPC';
import EditableTextareaPC from '../utils/EditableTextareaPC';

import '../../../node_modules/antd/dist/antd.css';

class ProjectCardUnitPC extends Component {
  static defaultProps = {
    project: {},
    tasks: {},
    handleAddProject: () => {},
  };

  state = {
    visible: false,
    title: '',
    body: '',
    startDate: '2018-06-06',
    dueDate: '2018-06-06',
  };

  handleChangeTitle = e => {
    this.setState({ title: e.target.value });
  };
  handleChangeBody = e => {
    this.setState({ body: e.target.value });
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
      projectId: this.props.project.id,
      complete: false,
    };
    this.props.handleAddTask(obj);
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
          <EditableTextareaPC
            projectId={this.props.project.id}
            keyType={'title'}
            body={this.props.project.title}
          />
          {this.props.tasks.map(task => {
            return this.props.project.id === task.projectId ? (
              <CardViewTaskUnitPC key={task.id} task={task} {...this.props} />
            ) : (
              ''
            );
          })}

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
