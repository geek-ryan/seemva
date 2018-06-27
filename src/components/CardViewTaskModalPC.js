import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal } from 'antd';
import { UserConsumer } from '../contexts/UserCTX';
import { LabelConsumer } from '../contexts/LabelCTX';
import { TaskConsumer } from '../contexts/TaskCTX';
import { ActivityConsumer } from '../contexts/ActivityCTX';

import EditableTextareaPC from './EditableTextareaPC';
import ActivityPC from './ActivityPC';

class CardViewTaskModalPC extends Component {
  handleUnitDelete = () => {
    this.props.onDelete(this.props.id);
  };

  handleUnitComplete = () => {
    this.props.onComplete(this.props.id);
  };

  showConfirm = () => {
    const Complete = this.handleUnitComplete;

    Modal.confirm({
      title: 'Do you Want to delete these items?',
      content: 'Some descriptions',
      onOk() {
        Complete();
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
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
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  render() {
    return (
      <React.Fragment>
        <EditableTextareaPC className="title" body={this.props.title} />
        <EditableTextareaPC body={this.props.body} />

        <div>
          <Button onClick={this.showConfirm}>Confirm</Button>
          <Button onClick={this.showDeleteConfirm} type="dashed">
            Delete
          </Button>
        </div>

        <ActivityConsumer>
          {({ activities, handleAddActivity, handleDeleteActivity }) => (
            <ActivityPC
              onAdd={handleAddActivity}
              activities={activities}
              onDelete={handleDeleteActivity}
              taskId={this.props.taskId}
            />
          )}
        </ActivityConsumer>
      </React.Fragment>
    );
  }
}

export default CardViewTaskModalPC;
