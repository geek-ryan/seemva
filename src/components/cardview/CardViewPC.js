import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal, Layout } from 'antd';

import ProjectCardUnitPC from './ProjectCardUnitPC';
import CardViewAddProjectPC from './CardViewAddProjectPC';
import SideLinePC from '../layout/SideLinePC';
import SidebarPC from '../layout/SidebarPC';
import HeaderPC from '../layout/HeaderPC';

import '../../../node_modules/antd/dist/antd.css';

import { ProjectProvider, ProjectConsumer } from '../../contexts/ProjectCTX';
import { TaskProvider, TaskConsumer } from '../../contexts/TaskCTX';
import { UserProvider, UserConsumer } from '../../contexts/UserCTX';
import { LabelProvider } from '../../contexts/LabelCTX';
import { ActivityProvider } from '../../contexts/ActivityCTX';
import { TeamProvider } from '../../contexts/TeamCTX';

const { Header, Footer, Sider, Content } = Layout;

class CardViewPC extends Component {
  static defaultProps = {
    teamId: 1,
    userId: 1,
  };

  state = {
    visible: false,
    body: '',
  };

  handleChange = e => {
    this.setState({ body: e.target.value });
    console.log(this.state.body);
  };

  handleAddProject = body => {
    const obj = {
      title: body,
      userId: this.props.userId,
      teamId: this.props.teamId,
      subtitle: 'test',
    };
    console.log('obj :', obj);
    this.props.projectFunc.Create(obj);
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

  render() {
    return (
      <React.Fragment>
        {this.props.projectState.projects.map(project => (
          <ProjectCardUnitPC
            key={project.id}
            {...this.props}
            project={project}
          />
        ))}

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
