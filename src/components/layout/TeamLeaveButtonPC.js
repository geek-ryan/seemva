import React, { Component } from 'react';

import { Modal, Button, Tooltip } from 'antd';

class TeamCreateButtonPC extends Component {
  static defaultProps = {
    name: '',
  };

  showLeaveConfirm = () => {
    Modal.confirm({
      title: 'Delete Team',
      content: (
        <div>
          Are you sure you want to delete
          <em style={{ color: 'red' }}> "{this.props.name}"</em>? This cannot be
          undone.
        </div>
      ),
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('Leave success');
      },
    });
  };

  render() {
    return (
      <Tooltip placement="right" title="Leave team">
        <Button
          type="primary"
          size="small"
          shape="circle"
          icon="logout"
          onClick={this.showLeaveConfirm}
        />
      </Tooltip>
    );
  }
}

export default TeamCreateButtonPC;
