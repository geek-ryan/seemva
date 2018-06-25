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
import { UserProvider, UserConsumer } from '../contexts/UserCTX';
import { LabelProvider } from '../contexts/LabelCTX';
import { ActivityProvider } from '../contexts/ActivityCTX';

class CardViewPC extends Component {
  render() {
    return (
      <React.Fragment>
        <UserProvider>
          <ProjectProvider>
            <LabelProvider>
              <TaskProvider>
                <ActivityProvider>
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
                </ActivityProvider>
              </TaskProvider>
            </LabelProvider>
          </ProjectProvider>
        </UserProvider>
      </React.Fragment>
    );
  }
}

export default CardViewPC;
