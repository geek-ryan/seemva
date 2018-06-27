import React, { Component } from 'react';
import { Button, Modal } from 'antd';

import EditableTextareaPC from '../utils/EditableTextareaPC';
import ActivityPC from '../cardview/ActivityPC';

class CardViewTaskModalPC extends Component {
  static defaultProps = {
    handleComplete: () => {},
    task: {},
    handleDeleteTask: () => {},
  };

  handleUnitDelete = () => {
    this.props.handleDeleteTask(this.props.task.id);
  };

  handleUnitComplete = () => {
    this.props.handleComplete(this.props.task.id);
  };

  showConfirm = () => {
    const Complete = this.handleUnitComplete;

    Modal.confirm({
      title: 'Do you Want to delete these items?',
      content: 'Some descriptions',
      onOk() {
        Complete();
      },
      onCancel() {},
    });
  };

  showDeleteConfirm = () => {
    const Delete = this.handleUnitDelete;

    Modal.confirm({
      title: 'Are you sure delete this task?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        Delete();
      },
      onCancel() {},
    });
  };

  render() {
    return (
      <React.Fragment>
        <EditableTextareaPC
          body={this.props.task.title}
          keyType={'title'}
          datatype={'task'}
          editfunc={this.props.handleEditTask}
          {...this.props}
        />
        <EditableTextareaPC
          body={this.props.task.body}
          keyType={'body'}
          datatype={'task'}
          editfunc={this.props.handleEditTask}
          {...this.props}
        />
        <div>
          <Button onClick={this.showConfirm}>Confirm</Button>
          <Button onClick={this.showDeleteConfirm} type="dashed">
            Delete
          </Button>
        </div>
        <ActivityPC {...this.props} />
      </React.Fragment>
    );
  }
}

export default CardViewTaskModalPC;
