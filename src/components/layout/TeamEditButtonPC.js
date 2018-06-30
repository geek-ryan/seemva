import React, { Component } from 'react';

import { Modal, Button, Tooltip } from 'antd';
import TeamModalPC from './TeamModalPC';

class TeamCreateButtonPC extends Component {
  static defaultProps = {
    name: '',
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

  handleEdit = values => {
    console.log(values);
    this.setState({ visible: false });
  };

  showDeleteConfirm = () => {
    const onDelete = this.props.onDelete;
    const closeModal = () => {
      this.setState({ visible: false });
    };
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
        onDelete();
        closeModal();
      },
    });
  };

  render() {
    const { name } = this.props;
    const { visible } = this.state;
    return (
      <React.Fragment>
        <Tooltip placement="right" title="Edit team">
          <Button
            type="primary"
            size="small"
            shape="circle"
            icon="edit"
            onClick={this.showModal}
          />
        </Tooltip>
        <TeamModalPC
          name={name}
          visible={visible}
          title="Edit Team"
          onCancel={this.handleCancel}
          onSave={this.handleEdit}
        >
          <Button type="danger" onClick={this.showDeleteConfirm}>
            Delete team
          </Button>
        </TeamModalPC>
      </React.Fragment>
    );
  }
}

export default TeamCreateButtonPC;
