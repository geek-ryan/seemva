import React, { Component } from 'react';
import { Icon, Modal, Card } from 'antd';

import CardViewTaskModalPC from '../taskmodal/CardViewTaskModalPC';

class CardViewTaskUnitPC extends Component {
  static defaultProps = {
    project: {},
    tasks: [],
    task: {},
    users: [],
    activities: [],
    labels: [],
    labelTaskAssignees: [],
    handleDeleteTask: () => {},
    handleComplete: () => {},
    handleDelete: () => {},
    handleAddTask: () => {},
    handleEditTask: () => {},
  };

  state = {
    visible: false,
  };

  showModal = () => {
    this.props.labelFunc.teamFilter(this.props.teamId);
    this.props.labelFunc.taskFilter(this.props.task.id);
    this.props.userFunc.teamFilter();
    this.props.userFunc.taskFilter(this.props.task.id);
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.props.labelFunc.assigneeCreate(this.props.task.id);
    this.props.userFunc.assigneeCreate(this.props.task.id);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  handleUnitDelete = () => {
    this.props.taskFunc.Delete(this.props.task.id);
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
        <Card style={{ width: 300 }}>
          <Icon
            type={this.props.task.complete ? 'check-circle' : 'check-circle-o'}
          />

          <Icon onClick={this.showDeleteConfirm} type="delete" />

          <h2 onClick={this.showModal}>{this.props.task.title}</h2>
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
