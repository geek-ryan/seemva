import React, { Component } from 'react';
import { Button, Modal, Input } from 'antd';

import { connect } from 'react-redux';

import ProjectCardUnitCC from '../../containers/ProjectCardUnitCC';

class CardViewPC extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.projects.map(project => (
          <ProjectCardUnitCC
            {...this.props}
            usableDelete={
              true
              // this.props.projectState.userID === project.userId
            }
            key={project.id}
            project={project}
          />
        ))}

        <Button
          className="project-card-button"
          icon="plus"
          onClick={this.props.newProjectShowModal}
        >
          Add New Project
        </Button>

        <Modal
          title="New Project Name"
          visible={this.props.newProjectModal.visible}
          onOk={this.props.newProjectOk}
          onCancel={this.props.newProjectCancle}
        >
          <Input
            value={this.props.newProjectModal.body}
            onChange={this.props.newProjectTitleChange}
            placeholder="project title"
          />
        </Modal>
      </React.Fragment>
    );
  }
}

const pullingProjects = state => {
  const projectArr = state.projectReducer.slice();
  const result = projectArr.filter(el => {
    return el.teamId === state.currentReducer.teamId;
  });
  return { projects: result };
};

export default connect(pullingProjects)(CardViewPC);
