import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { UserConsumer } from '../contexts/UserCTX';
import { LabelConsumer } from '../contexts/LabelCTX';
import { TaskConsumer } from '../contexts/TaskCTX';
import { ActivityConsumer } from '../contexts/ActivityCTX';

class CardViewTaskUnitPC extends Component {
  render() {
    // console.log('task props:', this.props);
    return (
      <React.Fragment>
        <Icon type={this.props.complete ? 'check-circle' : 'check-circle-o'} />
        <Icon type="delete" />
        <h2>{this.props.title}</h2>
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
      </React.Fragment>
    );
  }
}

export default CardViewTaskUnitPC;
