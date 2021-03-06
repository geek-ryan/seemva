import React, { Component } from 'react';
import { Icon, Modal, Card, List } from 'antd';
import { Route, Link, Redirect } from 'react-router-dom';

import TaskModalCC from '../../containers/TaskModalCC';
import LoadingIconPC from '../utils/LoadingIconPC';
import MemberAvatarPC from '../utils/MemberAvatarPC';

class CardViewTaskUnitPC extends Component {
  render() {
    return (
      <React.Fragment>
        <Card className="task-card">
          {this.props.taskState.loading ? (
            <LoadingIconPC />
          ) : (
            <div>
              <Icon
                type={
                  this.props.task.complete ? 'check-circle' : 'check-circle-o'
                }
              />

              <Icon onClick={this.props.taskDeleteConfirm} type="delete" />

              <h2 onClick={this.props.taskShowModal}>
                <Link
                  to={`/card/${this.props.project.teamId}/task/${
                    this.props.task.id
                  }`}
                >
                  {this.props.task.title}
                </Link>
              </h2>
              <span>{this.props.task.startDate}</span>
              <span>-</span>
              <span>{this.props.task.dueDate}</span>
            </div>
          )}
          <div>
            {this.props.userState.loading ? (
              <LoadingIconPC />
            ) : (
              this.props.userState.users.map(user => {
                return this.props.userState.userTaskAssignees.map(user_task => {
                  return user.id === user_task.userId &&
                    this.props.task.id === user_task.taskId ? (
                    <List.Item key={user_task.id}>
                      <List.Item.Meta
                        avatar={
                          <MemberAvatarPC
                            profile={user.profile}
                            username={user.username}
                          />
                        }
                      />
                    </List.Item>
                  ) : (
                    ''
                  );
                });
              })
            )}
          </div>
          <div>
            <Icon type="message" />
            <span>
              {this.props.activityState.loading ? (
                <LoadingIconPC />
              ) : (
                this.props.activityState.activities.filter(
                  activity => activity.taskId === this.props.task.id
                ).length
              )}
            </span>
          </div>
          <div>
            {this.props.labelState.loading ? (
              <LoadingIconPC />
            ) : (
              this.props.labelState.labels.map(label => {
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
              })
            )}
          </div>
        </Card>
        <Route
          path={`/card/${this.props.project.teamId}/task/:id`}
          render={({ match }) => (
            <TaskModalCC
              teamId={this.props.project.teamId}
              paramId={match.params.id}
              taskId={this.props.task.id}
              taskOk={this.props.taskOk}
              {...this.props}
              url={`/card/${this.props.project.teamId}`}
            />
          )}
        />
        )}
      </React.Fragment>
    );
  }
}

export default CardViewTaskUnitPC;
