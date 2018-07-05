import React, { Component } from 'react';
import CardViewPC from '../components/cardview/CardViewPC';

import withProjectCTX from '../hocs/withProjectCTX';

class CardViewCC extends Component {
  static defaultProps = {};

  state = {
    visible: false,
    body: '',
  };

  newProjectTitleChange = e => {
    this.setState({ body: e.target.value });
  };

  newProjectShowModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleAddProject = body => {
    this.props.projectFunc.Create({ title: body });
    this.setState({ body: '' });
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

export default withProjectCTX(CardViewCC);
