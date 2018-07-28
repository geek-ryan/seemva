import React, { Component } from 'react';

import { Card, Button, Switch, Icon } from 'antd';
import { Route, Link } from 'react-router-dom';

import TaskModalCC from '../../containers/TaskModalCC';
import MemberTooltipAvatarPC from '../utils/MemberTooltipAvatarPC';
import LabelTooltipPC from '../utils/LabelTooltipPC';

class TaskCardPC extends Component {
  static defaultProps = {
    project: {},
    taskMembers: [
      // {
      //   username: 'syami',
      //   email: 'syami@seemva.com',
      //   profile:
      //     'https://ucarecdn.com/b8800d01-4651-4b77-8ca8-de58bb78f196/syami.jpg',
      //   id: 2,
      // },
    ], // 태스크의 멤버
    task: {
      // id: 0,
      // title:
      //   '오늘의 할 일 여기는 타이틀 구간으로 텍스트 간격을 테스트 해봅니다.',
      // body:
      //   '오늘의 할 일 여기는 타이틀 구간으로 텍스트 간격을 테스트 해봅니다. 오늘의 할 일 여기는 타이틀 구간으로 텍스트 간격을 테스트 해봅니다.',
      // complete: true,
      // startDate: '2018.07.04',
      // dueDate: '2018.07.05',
    },
    taskLabels: [
      // {
      //   id: 1,
      //   color: 'red',
      //   body: 'red label',
      // },
    ],
    taskDeleteConfirm: () => console.log('default'),
    taskModalCompleteConfirm: () => console.log('default'),
    taskShowModal: () => console.log('default'),
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
      taskCompleteToggle,
      taskShowModal,
      taskLabels,
      colors,
    } = this.props;

    return (
      <Card className="task-card">
        <div className="task-card-title">
          <Switch
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="ellipsis" />}
            size="small"
            checked={task.complete}
            onClick={taskCompleteToggle}
          />
          <Button
            onClick={taskDeleteConfirm}
            size="small"
            shape="circle"
            type="danger"
            icon="delete"
            title="delete this task"
          />
        </div>

        <div className="task-card-body" onClick={taskShowModal}>
          <Link
            to={`/card/${this.props.teamCurrent}/task/${task.id}`}
            // onClick={this.props.onSetCurrentTask}
          >
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
              {
                this.props.activities.filter(
                  activity => activity.taskId === this.props.task.id
                ).length
              }
            </div>
            <div className="task-card-body__labels">
              {taskLabels.map(({ id, color, body }) => (
                <LabelTooltipPC
                  key={id}
                  color={
                    Object.entries(colors).find(item => item[0] === color)[1]
                  }
                  body={body}
                />
              ))}
            </div>
          </Link>
        </div>
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        <Route
          path={`/card/${this.props.teamCurrent}/task/:id`}
          render={({ match }) => (
            <TaskModalCC
              {...this.props}
              paramId={match.params.id}
              taskId={this.props.task.id}
              id={match.params.id}
              url={`/card/${this.props.teamCurrent}`}
            />
          )}
        />
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
      </Card>
    );
  }
}

// const pullingTaskMembers = state => {
//   console.log('state user reducer', state.userReducer);
//   const userArr = state.userReducer.slice();
//   const assigneeArr = state.taskUserAssigneeReducer.slice();
//   const filteredAssigneeArr = assigneeArr.filter(
//     el => el.taskId === state.currentReducer.taskId
//   );
//   const result = userArr.filter(el => {
//     return filteredAssigneeArr.filter(ele => {
//       return el.id === ele.userId;
//     });
//   });
//   return { taskMembers: result };
// };

// const pullingTaskLabels = state => {
//   console.log('state label reducer', state.labelReducer);
//   const labelArr = state.labelReducer.slice();
//   const assigneeArr = state.labelTaskAssigneeReducer.slice();
//   const filteredAssigneeArr = assigneeArr.filter(
//     el => el.taskId === state.currentReducer.taskId
//   );
//   const result = labelArr.filter(el => {
//     return filteredAssigneeArr.filter(ele => {
//       return el.id === ele.labelId;
//     });
//   });
//   return { taskLabels: result };
// };

// const pullingTaskActivity = state => {
//   const activityArr = state.activityReducer.slice();
//   const filteredArr = activityArr.filter(
//     el => el.taskId === state.currentReducer.taskId
//   );
//   return { activities: filteredArr };
// };

// const combiner = state => {
//   const aaa = pullingTaskMembers(state);
//   const bbb = pullingTaskLabels(state);
//   const ccc = pullingTaskActivity(state);
//   return { ...aaa, ...bbb, ...ccc };
// };

export default TaskCardPC;
