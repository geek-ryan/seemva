import React, { Component } from 'react';
import { Button, Modal, Input } from 'antd';

import { Projects } from '../actions';

import ProjectCardUnitCC from '../../containers/ProjectCardUnitCC';

class CardViewPC extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props
          .dispatch(Projects())
          .map(project => (
            <ProjectCardUnitCC
              {...this.props}
              usableDelete={this.props.projectState.userID === project.userId}
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

export default CardViewPC;
