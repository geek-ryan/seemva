import React, { Component } from 'react';
import { DatePicker } from 'antd';
import ProjectUnitCC from './projectUnitCC';

var moment = require('moment');

class Timeline extends Component {
  static defaultProps = {
    // taskState: {
    //   tasks: [
    //     {
    //       title: 't2-p1-t1',
    //       body: 'a',
    //       startDate: '2018.07.02',
    //       dueDate: '2018.07.12',
    //       projectId: 1,
    //       complete: false,
    //       id: 1,
    //     },
    //     {
    //       title: 't2-p1-t1',
    //       body: 'a',
    //       startDate: '2018.07.05',
    //       dueDate: '2018.07.13',
    //       projectId: 1,
    //       complete: false,
    //       id: 2,
    //     },
    //     {
    //       title: 't2-p1-t1',
    //       body: 'a',
    //       startDate: '2018.07.01',
    //       dueDate: '2018.07.03',
    //       projectId: 2,
    //       complete: false,
    //       id: 3,
    //     },
    //     {
    //       title: 't2-p1-t1',
    //       body: 'a',
    //       startDate: '2018.06.28',
    //       dueDate: '2018.07.28',
    //       projectId: 3,
    //       complete: false,
    //       id: 4,
    //     },
    //     {
    //       title: 't2-p1-t1',
    //       body: 'a',
    //       startDate: '2018.07.05',
    //       dueDate: '2018.07.07',
    //       projectId: 3,
    //       complete: false,
    //       id: 5,
    //     },
    //     {
    //       title: 't2-p1-t1',
    //       body: 'a',
    //       startDate: '2018.07.09',
    //       dueDate: '2018.07.11',
    //       projectId: 3,
    //       complete: false,
    //       id: 6,
    //     },
    //   ],
    // },
    // projectState: {
    //   projects: [
    //     {
    //       title: 'team2-project1',
    //       userId: 1,
    //       id: 1,
    //       teamId: 2,
    //     },
    //     {
    //       title: 'team2-pro1',
    //       userId: 1,
    //       id: 2,
    //       teamId: 2,
    //     },
    //     {
    //       title: 't2-p1',
    //       userId: 1,
    //       id: 3,
    //       teamId: 2,
    //     },
    //   ],
    // },
  };

  render() {
    return (
      <div className={'theContainer'}>
        <div className={'datePicker'}>
          <DatePicker
            defaultValue={moment(this.props.date.start, 'YYYY.MM.DD')}
            onChange={this.props.onStart}
          />

          <span className={'wave'}>{'  ~  '}</span>
          <DatePicker
            defaultValue={moment(this.props.date.end, 'YYYY.MM.DD')}
            onChange={this.props.onEnd}
          />
        </div>
        {this.props.projectState.projects.map(project => {
          return (
            <ProjectUnitCC
              key={project.id}
              project={{ ...project }}
              {...this.state}
              {...this.props}
            />
          );
        })}
      </div>
    );
  }
}

export default Timeline;
