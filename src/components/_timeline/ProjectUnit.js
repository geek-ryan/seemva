import React, { Component } from 'react';
import moment from 'moment';
import { Route, Link } from 'react-router-dom';

import ProcessCC from './ProcessCC';
import TaskModalCC from '../../containers/TaskModalCC';

class ProjectUnit extends Component {
  render() {
    const start = moment(this.props.date.start, 'YYYY.MM.DD').format('X');
    const end = moment(this.props.date.end, 'YYYY.MM.DD').format('X');
    const range = (end - start) / (60 * 60 * 24);

    return (
      <div className={'projectContainer'}>
        <h4 className={'projectTitle'}> {this.props.project.title} </h4>
        <div className={'timelineContainer'}>
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

              return (
                <div key={task.id}>
                  <Link to={`/tl/${this.props.project.teamId}/task/${task.id}`}>
                    <ProcessCC max={range} st={st} en={en} {...task} />
                  </Link>

                  <Route
                    path={`/tl/${this.props.project.teamId}/task/:id`}
                    render={({ match }) => {
                      return (
                        <TaskModalCC
                          teamId={this.props.project.teamId}
                          paramId={match.params.id}
                          taskId={task.id}
                          task={{ ...task }}
                          url={`/tl/${this.props.project.teamId}`}
                          {...this.props}
                        />
                      );
                    }}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default ProjectUnit;
