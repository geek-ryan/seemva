import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal } from 'antd';
import '../../node_modules/antd/dist/antd.css';

import { TeamConsumer } from '../contexts/TeamCTX';

class SidebarPC extends Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <React.Fragment>
        <h2 style={{ color: 'white' }}>SeemVA</h2>
        <Icon type="left-circle" />
        <div>Username</div>
        <TeamConsumer>
          {({ teams }) => {
            return teams.map(team => {
              return <div key={team.id}>{team.teamname}</div>;
            });
          }}
        </TeamConsumer>
        <div onClick={this.showModal}>Add Team</div>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Title you want</p>
        </Modal>
        <Button>Log out</Button>
      </React.Fragment>
    );
  }
}

export default SidebarPC;
