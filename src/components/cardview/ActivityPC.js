import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';

import EditableTextareaPC from '../utils/EditableTextareaPC';
import LoadingIconPC from '../utils/LoadingIconPC';

class ActivityPC extends Component {
  render() {
    return (
      <React.Fragment>
        <div>Activities</div>

        <Form>
          <Form.Item>
            <Input placeholder="activity" onChange={this.props.handleChange} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.props.handleAddActivity}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>

        {this.props.activityState.loading ? (
          <LoadingIconPC />
        ) : (
          this.props.activityState.activities.map(
            activity =>
              activity.taskId === this.props.task.id ? (
                <div key={activity.id}>
                  <EditableTextareaPC
                    activity={activity}
                    body={activity.body}
                    keyType={'body'}
                    datatype={'activity'}
                    editfunc={this.props.activityFunc.Update}
                    {...this.props}
                  />
                  <Button
                    value={activity.id}
                    onClick={this.props.handleDeleteActivity}
                  >
                    <Icon type="close" />
                  </Button>
                </div>
              ) : (
                ''
              )
          )
        )}
      </React.Fragment>
    );
  }
}

export default ActivityPC;
