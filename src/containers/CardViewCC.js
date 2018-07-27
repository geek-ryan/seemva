import React, { Component } from 'react';
import CardViewPC from '../components/cardview/CardViewPC';

import { createProject } from '../actions';
import { connect } from 'react-redux';

var moment = require('moment');

class CardViewCC extends Component {
  static defaultProps = {
    userCurrent: 0,
    teamCurrent: 0,
  };

  state = {
    visible: false,
    body: '',
  };

  handleAddProject = contents => {
    this.props.dispatch(
      createProject({
        userId: this.props.userCurrent,
        teamId: this.props.teamCurrent,
        title: this.state.body,
      })
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

const pullingBaseSetting = state => {
  return {
    projects: state.projectReducer.sort(
      (a, b) => moment(a.logDate).format('X') - moment(b.logDate).format('X')
    ),
    userCurrent: state.currentReducer.userId,
    teamCurrent: state.currentReducer.teamId,
  };
};

export default connect(pullingBaseSetting)(CardViewCC);
