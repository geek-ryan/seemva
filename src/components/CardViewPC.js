import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal, Layout } from 'antd';

import ProjectCardUnitPC from './ProjectCardUnitPC';
import CardViewAddProjectPC from './CardViewAddProjectPC';
import SideLinePC from './SideLinePC';
import SidebarPC from './SidebarPC';
import HeaderPC from './HeaderPC';

import '../../node_modules/antd/dist/antd.css';

import { ProjectProvider, ProjectConsumer } from '../contexts/ProjectCTX';
import { TaskProvider, TaskConsumer } from '../contexts/TaskCTX';
import { UserProvider, UserConsumer } from '../contexts/UserCTX';
import { LabelProvider } from '../contexts/LabelCTX';
import { ActivityProvider } from '../contexts/ActivityCTX';
import { TeamProvider } from '../contexts/TeamCTX';

const { Header, Footer, Sider, Content } = Layout;

class CardViewPC extends Component {
  state = {
    visible: false,
    visibleUser: false,
    body: '',
  };

  handleChange = e => {
    this.setState({ body: e.target.value });
  };

  handleAddProject = body => {
    const obj = {
      title: body,
      userId: 1,
      teamId: 1,
    };
    console.log(obj);
    this.props.onAdd(obj);
    this.setState({ body: '' });
  };

  // modal project -------------------------------

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log('click ok');
    this.handleAddProject(this.state.body);
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  // modal user -------------------------------

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
          <input
            value={this.state.body}
            onChange={this.handleChange}
            placeholder="project title"
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default CardViewPC;
