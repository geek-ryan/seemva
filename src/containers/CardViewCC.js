import React, { Component } from 'react';
import CardViewPC from '../components/cardview/CardViewPC';

import withProjectCTX from '../hocs/withProjectCTX';
import withTeamCTX from '../hocs/withTeamCTX';

import { createProject, currentUser, currentTeam } from '../actions';
import { connect } from 'react-redux';

class CardViewCC extends Component {
  static defaultProps = {};

  state = {
    visible: false,
    body: '',
  };

  // componentDidMount = () => {
  //     'card view cc mounted',
  //     this.props.userCurrent,
  //     this.props.teamCurrent
  //   );
  //   this.props.dispatch(currentUser(userId));
  //   this.props.dispatch(currentTeam(teamId));
  // };

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

const pullingState = state => {
  return { testState: state };
};

export default connect(pullingState)(CardViewCC);
