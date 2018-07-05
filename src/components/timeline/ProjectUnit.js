import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Modal } from 'antd';

import ProcessCC from './ProcessCC';
import TaskModalCC from '../../containers/TaskModalCC';

var moment = require('moment');

class ProjectUnit extends Component {
  render() {
    const start = moment(this.props.date.start, 'YYYY.MM.DD').format('X');
    const end = moment(this.props.date.end, 'YYYY.MM.DD').format('X');
    const range = (end - start) / (60 * 60 * 24);
    // console.log(this.props.taskState);

    return (
      <div>
        <h4> {this.props.project.title} </h4>
        {this.props.taskState.tasks
          .filter(ele => ele.projectId === this.props.project.id)
          .map(task => {
            const st =
              (moment(task.startDate, 'YYYY.MM.DD').format('X') - start) /
                (60 * 60 * 24) >
              0
                ? (moment(task.startDate, 'YYYY.MM.DD').format('X') - start) /
                  (60 * 60 * 24)
                : 0;
            const en =
              (moment(task.dueDate, 'YYYY.MM.DD').format('X') - start) /
                (60 * 60 * 24) <
              range
                ? (moment(task.dueDate, 'YYYY.MM.DD').format('X') - start) /
                  (60 * 60 * 24)
                : range;
            // console.log(st, en, range);

            return (
              <div key={task.id}>
                <Link to={`/tl/${this.props.project.teamId}/task/${task.id}`}>
                  <ProcessCC max={range} st={st} en={en} {...task} />
                </Link>

                <Route
                  path={`/tl/${this.props.project.teamId}/task/:id`}
                  render={({ match }) => (
                    <TaskModalCC
                      teamId={this.props.project.teamId}
                      id={match.params.id}
                      taskId={task.id}
                      task={{ ...task }}
                      url={`/tl/${this.props.project.teamId}`}
                      {...this.props}
                    />
                  )}
                />
              </div>
            );
          })}
      </div>
    );
  }
}

export default ProjectUnit;
