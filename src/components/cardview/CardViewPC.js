import React, { Component } from 'react';
import { Icon, Modal } from 'antd';

import ProjectCardUnitPC from './ProjectCardUnitPC';

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
    this.props.handleAddProject(obj);
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
        {this.props.projects.map(project => (
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
