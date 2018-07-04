import React, { Component } from 'react';

import { Card, Button, Switch, Icon } from 'antd';
import { Route, Link } from 'react-router-dom';

import TaskModalCC from '../../containers/TaskModalCC';
import MemberTooltipAvatarPC from '../utils/MemberTooltipAvatarPC';
import LabelTooltipPC from '../utils/LabelTooltipPC';

class TaskCardPC extends Component {
  static defaultProps = {
    taskMembers: [
      {
        username: 'syami',
        email: 'syami@seemva.com',
        profile:
          'https://ucarecdn.com/b8800d01-4651-4b77-8ca8-de58bb78f196/syami.jpg',
        id: 2,
      },
      {
        username: 'geekkkkkkkkkkkk',
        email: 'geek@seemva.com',
        profile: '',
        id: 3,
      },
    ], // 태스크의 멤버
    task: {
      id: 1,
      title:
        '오늘의 할 일 여기는 타이틀 구간으로 텍스트 간격을 테스트 해봅니다.',
      complete: false,
      startDate: '2018.07.04',
      dueDate: '2018.07.05',
    },
    taskDeleteConfirm: () => {},
    taskShowModal: () => {},
    activitesLength: 0,
    labels: [
      {
        id: 1,
        color: 'red',
        body: 'red label',
      },
      {
        id: 2,
        color: 'orange',
        body: 'oragne label',
      },
      {
        id: 3,
        color: 'green',
        body: 'green label',
      },
    ],
    colors: {
      default: '#bfbfbf',
      yellow: '#fadb14',
      green: '#52c41a',
      magenta: '#eb2f96',
      orange: '#fa8c16',
      cyan: '#13c2c2',
      purple: '#722ed1',
      red: '#f5222d',
      blue: '#1890ff',
    },
  };
  render() {
    const {
      taskMembers,
      task,
      taskDeleteConfirm,
      taskShowModal,
      activitesLength,
      labels,
      colors,
    } = this.props;
    return (
      <Card className="task-card">
        <div className="task-card-title">
          <Switch size="small" defaultChecked={task.complete} />
          <Button
            onClick={taskDeleteConfirm}
            size="small"
            shape="circle"
            type="danger"
            icon="delete"
          />
        </div>
        <div className="task-card-body" onClick={taskShowModal}>
          <Link to={`card/task/${task.id}`}>
            <h2 className="task-card-body__title">{task.title}</h2>
            {task.startDate && (
              <div className="task-card-body__date">
                {task.startDate}
                <span className="char"> - </span>
                {task.dueDate}
              </div>
            )}
            <div className="task-card-body__members">
              {taskMembers.map(member => (
                <MemberTooltipAvatarPC
                  key={member.id}
                  {...member}
                  size="small"
                />
              ))}
            </div>
            <div className="task-card-body__activities">
              <Icon type="message" />
              {activitesLength}
            </div>
            <div className="task-card-body__labels">
              {labels.map(({ color, body }) => (
                <LabelTooltipPC
                  color={
                    Object.entries(colors).find(item => item[0] === color)[1]
                  }
                  body={body}
                />
              ))}
            </div>
          </Link>
        </div>
      </Card>
    );
  }
}

export default TaskCardPC;