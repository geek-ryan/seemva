import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal } from 'antd';
import '../../../node_modules/antd/dist/antd.css';

import UserIconPC from '../utils/UserIconPC';
import SearchBarPC from './SearchBarPC';

class HeaderPC extends Component {
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
        <span>
          Welcome SeemVA
          <UserIconPC />
          <Icon type="plus-circle-o" onClick={this.showModal} />
          <SearchBarPC />
        </span>

        <Modal
          title={'New Member'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>This will be search form for member</p>
        </Modal>
      </React.Fragment>
    );
  }
}

export default HeaderPC;
