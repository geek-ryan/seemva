import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal } from 'antd';
import { UserConsumer } from '../contexts/UserCTX';
import { LabelConsumer } from '../contexts/LabelCTX';
import { TaskConsumer } from '../contexts/TaskCTX';
import { ActivityConsumer } from '../contexts/ActivityCTX';

class CardViewTaskModalPC extends Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    this.props.onDelete(this.props.id);
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  handleCompleteChange = () => {
    this.props.onComplete(this.props.id);
    // console.log(this.props);
  };

  handleUnitDelete = () => {
    this.props.onDelete(this.props.id);
    // console.log(this.props);
  };

  render() {
    return (
      <React.Fragment>
        <p>{this.props.body}</p>
        <div
          className={this.props.complete ? '' : 'hidden'}
          onClick={this.handleCompleteChange}
        >
          COMPLETE
        </div>
        <div onClick={this.showModal}>Delete</div>
        <Modal
          title="Delete Task"
          visible={this.state.visible}
          onOk={this.handleUnitDelete}
          onCancel={this.handleCancel}
        >
          <p>Really sure to delete this task?</p>
        </Modal>
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
                    <span key={activity.id}>
                      username / {activity.body} / {activity.logDate}
                    </span>
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
