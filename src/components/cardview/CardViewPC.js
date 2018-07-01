import React, { Component } from 'react';
import { Icon, Modal } from 'antd';

import ProjectCardUnitCC from '../../containers/ProjectCardUnitCC';

class CardViewPC extends Component {
  render() {
    console.log(this.props.projectState);
    return (
      <React.Fragment>
        {this.props.projectState.projects.map(project => (
          <ProjectCardUnitCC
            key={project.id}
            {...this.props}
            project={project}
          />
        ))}

        <div onClick={this.props.newProjectShowModal}>
          <Icon type="plus" /> Add New Project
        </div>
        <Modal
          visible={this.props.newProjectModal.visible}
          onOk={this.props.newProjectOk}
          onCancel={this.props.newProjectCancle}
        >
          <input
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
