import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal } from 'antd';
import { UserConsumer } from '../contexts/UserCTX';
import { LabelConsumer } from '../contexts/LabelCTX';
import { TaskConsumer } from '../contexts/TaskCTX';
import { ActivityConsumer } from '../contexts/ActivityCTX';

import EditableTextareaPC from './EditableTextareaPC';

class CardViewTaskModalPC extends Component {
  showConfirm() {
    Modal.confirm({
      title: 'Do you Want to delete these items?',
      content: 'Some descriptions',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  showDeleteConfirm() {
    Modal.confirm({
      title: 'Are you sure delete this task?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

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

        <div>Activities</div>
        <Form>
          <span>"user info from user state"</span>
          <Form.Item>
            <Input placeholder="activity" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div>
          <ActivityConsumer>
            {({ activities }) =>
              activities.map(
                activity =>
                  activity.taskId === this.props.id ? (
                    <div key={activity.id}>
                      <EditableTextareaPC {...activity} />
                      <Icon type="close-square-o" />
                    </div>
                  ) : (
                    ''
                  )
              )
            }
          </ActivityConsumer>
        </div>
      </React.Fragment>
    );
  }
}

export default CardViewTaskModalPC;
