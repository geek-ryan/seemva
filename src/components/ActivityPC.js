import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal } from 'antd';
import { UserConsumer } from '../contexts/UserCTX';
import { LabelConsumer } from '../contexts/LabelCTX';
import { TaskConsumer } from '../contexts/TaskCTX';
import { ActivityConsumer } from '../contexts/ActivityCTX';

import EditableTextareaPC from './EditableTextareaPC';

class ActivityPC extends Component {
  state = {
    body: '',
  };

  handleChange = e => {
    this.setState({ body: e.target.value });
    console.log(this.state.body);
  };

  handleAddActivity = () => {
    console.log('get add button');
    const obj = {
      body: this.state.body,
      taskId: this.props.taskId,
      userId: 1,
      logDate: '2018-06-10',
    };
    this.props.onAdd(obj);
  };

  handleDeleteActivity = e => {
    console.log(e.target.value);
    this.props.onDelete(e.target.value);
  };

  render() {
    return (
      <React.Fragment>
        <div>Activities</div>

        <Form>
          <Form.Item>
            <Input placeholder="activity" onChange={this.handleChange} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleAddActivity}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>

        {this.props.activities.map(
          activity =>
            activity.taskId === this.props.taskId ? (
              <div key={activity.id}>
                <EditableTextareaPC {...activity} />
                <Icon
                  value={activity.id}
                  onClick={this.handleDeleteActivity}
                  type="close-square-o"
                />
              </div>
            ) : (
              ''
            )
        )}
      </React.Fragment>
    );
  }
}

export default ActivityPC;
