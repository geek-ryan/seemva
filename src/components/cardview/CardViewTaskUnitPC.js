import React, { Component } from 'react';
import { Icon, Modal, Card } from 'antd';

import TaskModalCC from '../../containers/TaskModalCC';
import LoadingIconPC from '../utils/LoadingIconPC';

class CardViewTaskUnitPC extends Component {
  render() {
    if (
      this.props.activityState.loading ||
      this.props.taskState.loading ||
      this.props.labelState.loading ||
      this.props.userState.loading
    ) {
      return <LoadingIconPC />;
    } else {
      return (
        <React.Fragment>
          <Card style={{ width: 300 }}>
            <Icon
              type={
                this.props.task.complete ? 'check-circle' : 'check-circle-o'
              }
            />

            <Icon onClick={this.props.taskDeleteConfirm} type="delete" />

            <h2 onClick={this.props.taskShowModal}>{this.props.task.title}</h2>
            <span>{this.props.task.startDate}</span>
            <span>-</span>
            <span>{this.props.task.dueDate}</span>
            <div>
              {this.props.userState.users.map(user => {
                return this.props.userState.userTaskAssignees.map(user_task => {
                  return user.id === user_task.userId &&
                    this.props.task.id === user_task.taskId ? (
                    <span key={user_task.id}> {user.username} </span>
                  ) : (
                    ''
                  );
                });
              })}
            </div>
            <div>
              <Icon type="message" />
              <span>
                {
                  this.props.activityState.activities.filter(
                    activity => activity.taskId === this.props.task.id
                  ).length
                }
              </span>
            </div>

            <div>
              {this.props.labelState.labels.map(label => {
                return this.props.labelState.labelTaskAssignees.map(
                  label_task => {
                    return label.id === label_task.labelId &&
                      this.props.task.id === label_task.taskId ? (
                      <span key={label_task.id} className={label.color}>
                        {label.body}
                      </span>
                    ) : (
                      ''
                    );
                  }
                );
              })}
            </div>

            <Modal
              visible={this.props.taskModal.visible}
              onOk={this.props.taskOk}
              onCancel={this.props.taskCancle}
            >
              <TaskModalCC {...this.props} />
            </Modal>
          </Card>
        </React.Fragment>
      );
    }
  }
}

export default CardViewTaskUnitPC;
