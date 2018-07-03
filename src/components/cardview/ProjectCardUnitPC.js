import React, { Component } from 'react';
import { Input, Icon, Modal, Card, DatePicker } from 'antd';

import CardViewTaskUnitCC from '../../containers/CardViewTaskUnitCC';
import EditableTextareaPC from '../utils/EditableTextareaPC';
import LabelSearchBar from '../utils/LabelSearchBar';
import UserSearchBar from '../utils/UserSearchBar';

import '../../../node_modules/antd/dist/antd.css';

var moment = require('moment');

class ProjectCardUnitPC extends Component {
  render() {
    return (
      <React.Fragment>
        <Card className="project-card">
          <div>
            <EditableTextareaPC
              body={this.props.project.title}
              keyType={'title'}
              datatype={'project'}
              editfunc={this.props.projectFunc.Update}
              {...this.props}
            />
            {this.props.taskState.tasks.map(task => {
              return this.props.project.id === task.projectId ? (
                <CardViewTaskUnitCC key={task.id} task={task} {...this.props} />
              ) : (
                ''
              );
            })}
          </div>

          <div onClick={this.props.newTaskShowModal}>
            <Icon type="plus" /> Add New Task
          </div>
          <Modal
            visible={this.props.taskNew.visible}
            onOk={this.props.newTaskOk}
            onCancel={this.props.newTaskCancel}
          >
            <Input
              onChange={this.props.newTaskTitleChange}
              placeholder="Title"
              value={this.props.taskNew.title}
            />
            <Input.TextArea
              onChange={this.props.newTaskbodyChange}
              placeholder="Body"
              value={this.props.taskNew.body}
              row={4}
            />
            <DatePicker.RangePicker
              onChange={this.props.newTaskDateChange}
              value={[moment(), moment()]}
            />
            <UserSearchBar {...this.props} />
            <LabelSearchBar {...this.props} />
          </Modal>
        </Card>
      </React.Fragment>
    );
  }
}

export default ProjectCardUnitPC;
