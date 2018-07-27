import React, { Component } from 'react';
import { Button, Modal, Input } from 'antd';

import ProjectCardUnitCC from '../../containers/ProjectCardUnitCC';

class CardViewPC extends Component {
  static defaultProps = {
    projects: [],
    currentUser: 0,
    newProjectShowModal: () => console.log('default'),
    newProjectModal: { visible: 0, body: 0 },
    newProjectTitleChange: () => console.log('default'),
  };

  render() {
    return (
      <React.Fragment>
        {this.props.projects.map(project => (
          <ProjectCardUnitCC
            {...this.props}
            usableDelete={this.props.currentUser === project.userId}
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

// const pullingProjects = state => {
//   const projectArr = state.projectReducer.slice();
//   const result = projectArr.filter(el => {
//     return el.teamId === state.currentReducer.teamId;
//   });
//   return { projects: result, currentUser: state.currentReducer.userId };
// };

export default CardViewPC;
