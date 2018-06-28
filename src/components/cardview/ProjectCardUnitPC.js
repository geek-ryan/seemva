import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal, Card, DatePicker } from 'antd';

import CardViewTaskUnitPC from './CardViewTaskUnitPC';
import EditableTextareaPC from '../utils/EditableTextareaPC';
import LabelSearchBar from '../utils/LabelSearchBar';

import '../../../node_modules/antd/dist/antd.css';

var moment = require('moment');

class ProjectCardUnitPC extends Component {
  static defaultProps = {
    project: {},
    tasks: {},
    handleAddProject: () => {},
    date: [],
  };

  state = {
    visible: false,
    title: '',
    body: '',
    startDate: moment().format('YYYY-MM-DD'),
    dueDate: moment().format('YYYY-MM-DD'),
  };

  handleChangeTitle = e => {
    this.setState({ title: e.target.value });
  };
  handleChangeBody = e => {
    this.setState({ body: e.target.value });
  };

  handleDateChange = (date, dateString) => {
    const startMoment = moment(dateString[0], 'YYYY-MM-DD');
    const dueMoment = moment(dateString[1], 'YYYY-MM-DD');
    if (startMoment > dueMoment) {
      alert('Please check date again');
    } else {
      this.setState({ startDate: dateString[0], dueDate: dateString[1] });
    }
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
            body={this.props.project.title}
            keyType={'title'}
            datatype={'project'}
            editfunc={this.props.handleEditProject}
            {...this.props}
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
            <DatePicker.RangePicker
              onChange={this.handleDateChange}
              value={[moment(), moment()]}
            />
            <LabelSearchBar {...this.props} />
          </Modal>
        </Card>
      </React.Fragment>
    );
  }
}

export default ProjectCardUnitPC;
