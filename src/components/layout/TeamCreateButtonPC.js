import React, { Component } from 'react';

import { Button } from 'antd';
import TeamModalPC from './TeamModalPC';

class TeamCreateButtonPC extends Component {
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
    this.props.onCreateTeam(name);
    this.handleCancel();
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
          visible={visible}
          title="Create a New Team"
          onCancel={this.handleCancel}
          onSave={this.handleCreate}
        />
      </React.Fragment>
    );
  }
}

export default TeamCreateButtonPC;
