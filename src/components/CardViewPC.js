import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal } from 'antd';

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
  state = {
    visible: false,
    visibleUser: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  showModalUser = () => {
    this.setState({
      visibleUser: true,
    });
  };

  handleOkUser = e => {
    this.setState({
      visibleUser: false,
    });
  };
  handleCancelUser = e => {
    this.setState({
      visibleUser: false,
    });
  };

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
                    <Icon type="plus" onClick={this.showModalUser} />
                  </div>
                  <Modal
                    title={'New Member'}
                    visible={this.state.visibleUser}
                    onOk={this.handleOkUser}
                    onCancel={this.handleCancelUser}
                  >
                    <p>This will be search form for member</p>
                  </Modal>
                  <SearchBarPC />
                  <ProjectConsumer>
                    {({ projects }) =>
                      projects.map(project => (
                        <ProjectCardUnitPC key={project.id} {...project} />
                      ))
                    }
                  </ProjectConsumer>
                  <div onClick={this.showModal}>
                    <Icon type="plus" /> Add New Project
                  </div>
                  <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                  >
                    <p>Title you want</p>
                  </Modal>
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
