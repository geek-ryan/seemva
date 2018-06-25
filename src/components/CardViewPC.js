import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';

import UserIconPC from './UserIconPC';
import SearchBarPC from './SearchBarPC';
import ProjectCardUnitPC from './ProjectCardUnitPC';
import CardViewAddProjectPC from './CardViewAddProjectPC';
import SideLinePC from './SideLinePC';

import '../../node_modules/antd/dist/antd.css';

import { ProjectProvider, ProjectConsumer } from '../contexts/ProjectCTX';
import { TaskProvider, TaskConsumer } from '../contexts/TaskCTX';

class CardViewPC extends Component {
  render() {
    return (
      <React.Fragment>
        <ProjectProvider>
          <TaskProvider>
            <SideLinePC />
            <div>
              <span>Welcome SeemVA</span>
              <UserIconPC />
              <Icon type="plus" />
            </div>
            <SearchBarPC />
            <ProjectConsumer>
              {({ projects }) =>
                projects.map(project => (
                  <ProjectCardUnitPC key={project.id} {...project} />
                ))
              }
            </ProjectConsumer>
            <CardViewAddProjectPC />
          </TaskProvider>
        </ProjectProvider>
      </React.Fragment>
    );
  }
}

export default CardViewPC;
