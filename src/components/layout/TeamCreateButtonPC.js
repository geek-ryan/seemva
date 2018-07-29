import React, { Component } from 'react';

import { Button } from 'antd';
import TeamModalPC from './TeamModalPC';
import { createTeam, createTeamUserAssignee } from '../../actions';
import { connect } from 'react-redux';

var moment = require('moment');

class TeamCreateButtonPC extends Component {
  static defaultProps = {
    onCreateTeam: name => {},
  };
  state = {
    visible: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = ({ name }) => {
    const form = this.formRef.props.form;
    // this.props.onCreateTeam(name);
    const res = this.props.dispatch(
      createTeam({ teamname: name, logDate: moment() })
    );
    this.props.dispatch(
      createTeamUserAssignee({
        teamId: res.id,
        userId: this.props.userCurrent,
      })
    );
    this.setState({ visible: false });
    form.resetFields();
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { visible } = this.state;
    return (
      <React.Fragment>
        <Button
          icon="plus"
          className="team-add-button"
          onClick={this.showModal}
        >
          add team
        </Button>
        <TeamModalPC
          wrappedComponentRef={this.saveFormRef}
          visible={visible}
          title="Create a New Team"
          onCancel={this.handleCancel}
          onSave={this.handleCreate}
        />
      </React.Fragment>
    );
  }
}

const pullingUserCurrent = state => {
  return { userCurrent: state.currentReducer.userId };
};

export default connect(pullingUserCurrent)(TeamCreateButtonPC);
