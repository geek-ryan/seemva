import React, { Component } from 'react';

import { Modal, Button, Tooltip } from 'antd';

import { connect } from 'react-redux';

import { deleteTeamUserAssignee } from '../../actions';

class TeamCreateButtonPC extends Component {
  static defaultProps = {
    name: '',
  };

  showLeaveConfirm = () => {
    const onDelete = this.props.onDelete;
    const assignees = this.props.teamUserAssignees;
    const teamId = this.props.teamId;
    const userId = this.props.userId;
    const dispatch = this.props.dispatch;
    console.log('confirm', teamId, userId);

    Modal.confirm({
      title: 'Leave Team',
      content: (
        <div>
          Are you sure you want to leave
          <em style={{ color: 'red' }}> "{this.props.name}"</em>? This cannot be
          undone.
        </div>
      ),
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // onDelete();
        const assignee = assignees.filter(
          assignee => assignee.teamId === teamId && assignee.userId === userId
        );
        dispatch(deleteTeamUserAssignee(assignee[0].id));
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
          className="team-leave-button"
          onClick={this.showLeaveConfirm}
        />
      </Tooltip>
    );
  }
}

const pullingTeamUserAssignees = state => {
  return {
    teamUserAssignees: state.teamUserAssigneeReducer,
    userId: state.currentReducer.userId,
  };
};

export default connect(pullingTeamUserAssignees)(TeamCreateButtonPC);
