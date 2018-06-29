import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';

import EditableTextareaPC from '../utils/EditableTextareaPC';

class ActivityPC extends Component {
  static defaultProps = {
    handleComplete: () => {},
    task: {},
    handleDeleteTask: () => {},
  };

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
      taskId: this.props.task.id,
      userId: 1,
      logDate: '2018-06-10',
    };
    this.props.activityFunc.Create(obj);
  };

  handleDeleteActivity = e => {
    console.log(e.target.value);
    const id = parseInt(e.target.value);
    const func = this.props.activityFunc.Delete;
    func(id);
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

        {this.props.activityState.activities.map(
          activity =>
            activity.taskId === this.props.task.id ? (
              <div key={activity.id}>
                <EditableTextareaPC
                  activity={activity}
                  body={activity.body}
                  keyType={'body'}
                  datatype={'activity'}
                  editfunc={this.props.activityFunc.Edit}
                  {...this.props}
                />
                <Button value={activity.id} onClick={this.handleDeleteActivity}>
                  <Icon type="close" />
                </Button>
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
