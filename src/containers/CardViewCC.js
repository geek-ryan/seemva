import React, { Component } from 'react';
import CardViewPC from '../components/cardview/CardViewPC';

import withProjectCTX from '../hocs/withProjectCTX';
import withTeamCTX from '../hocs/withTeamCTX';

import { createProject } from '../actions';

class CardViewCC extends Component {
  static defaultProps = {};

  state = {
    visible: false,
    body: '',
  };

  handleAddProject = contents => {
    this.props.dispatch(
      createProject({ userId: 1, teamId: 1, title: this.state.body })
    );

    this.setState({ body: '' });
  };

  newProjectTitleChange = e => {
    this.setState({ body: e.target.value });
  };

  newProjectShowModal = () => {
    this.setState({
      visible: true,
    });
  };

  newProjectOk = () => {
    this.handleAddProject(this.state.body);
    this.setState({
      visible: false,
    });
  };

  newProjectCancle = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <CardViewPC
        {...this.props}
        newProjectModal={this.state}
        newProjectShowModal={this.newProjectShowModal}
        newProjectCancle={this.newProjectCancle}
        newProjectOk={this.newProjectOk}
        newProjectTitleChange={this.newProjectTitleChange}
      />
    );
  }
}

export default withTeamCTX(CardViewCC);
