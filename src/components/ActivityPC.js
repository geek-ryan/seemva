import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal } from 'antd';
import { UserConsumer } from '../contexts/UserCTX';
import { LabelConsumer } from '../contexts/LabelCTX';
import { TaskConsumer } from '../contexts/TaskCTX';
import { ActivityConsumer } from '../contexts/ActivityCTX';

import EditableTextareaPC from './EditableTextareaPC';

class ActivityPC extends Component {
  render() {
    return (
      <React.Fragment>
        <div>Activities</div>
        <Form>
          <Form.Item>
            <Input placeholder="activity" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
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

export default ActivityPC;
