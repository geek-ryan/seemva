import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal, Card } from 'antd';
import { UserConsumer } from '../contexts/UserCTX';
import { LabelConsumer } from '../contexts/LabelCTX';
import { TaskConsumer } from '../contexts/TaskCTX';
import { ActivityConsumer } from '../contexts/ActivityCTX';

import CardViewTaskModalPC from './CardViewTaskModalPC';

class CardViewTaskUnitPC extends Component {
  state = {
    visible: false,
    visibleDelete: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  showModalDelete = () => {
    this.setState({
      visibleDelete: true,
    });
  };

  handleCancelDelete = e => {
    this.setState({
      visibleDelete: false,
    });
  };

  handleUnitDelete = () => {
    this.props.onDelete(this.props.id);
  };

  render() {
    // console.log('task props:', this.props);
    return (
      <React.Fragment>
        <Card style={{ width: 300 }}>
          <Icon
            type={this.props.complete ? 'check-circle' : 'check-circle-o'}
          />
          <Icon onClick={this.showModalDelete} type="delete" />
          <Modal
            title="Delete Task"
            visible={this.state.visibleDelete}
            onOk={this.handleUnitDelete}
            onCancel={this.handleCancelDelete}
          >
            <p>Really sure to delete this task?</p>
          </Modal>
          <h2 onClick={this.showModal}>{this.props.title}</h2>
          <span>{this.props.startDate}</span>
          <span>-</span>
          <span>{this.props.dueDate}</span>
          <div>
            <UserConsumer>
              {({ users, user_tasks }) =>
                users.map(user => {
                  return user_tasks.map(user_task => {
                    return user.id === user_task.userId &&
                      this.props.id === user_task.taskId ? (
                      <span key={user_task.id}> {user.username} </span>
                    ) : (
                      ''
                    );
                  });
                })
              }
            </UserConsumer>
          </div>
          <div>
            <Icon type="message" />
            <ActivityConsumer>
              {({ activities }) => {
                let i = 0;
                activities.map(
                  activity => (activity.taskId === this.props.id ? i++ : '')
                );
                return <span>{i}</span>;
              }}
            </ActivityConsumer>
          </div>
          <div>
            <LabelConsumer>
              {({ labels, label_tasks }) =>
                labels.map(label => {
                  return label_tasks.map(label_task => {
                    return label.id === label_task.labelId &&
                      this.props.id === label_task.taskId ? (
                      <span key={label_task.id} className={label.color}>
                        {' '}
                        {label.body}{' '}
                      </span>
                    ) : (
                      ''
                    );
                  });
                })
              }
            </LabelConsumer>
          </div>
          <Modal
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <CardViewTaskModalPC {...this.props} />
          </Modal>
        </Card>
      </React.Fragment>
    );
  }
}

export default CardViewTaskUnitPC;
