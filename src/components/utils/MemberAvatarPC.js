import React, { Component } from 'react';
import { Avatar, Tooltip } from 'antd';

class UserIconPC extends Component {
  static defaultProps = {
    username: '',
    profile: '',
  };
  render() {
    const { username, profile } = this.props;
    return (
      <Tooltip placement="bottom" title={username}>
        {profile ? (
          <Avatar src={profile} />
        ) : (
          <Avatar>{username.substr(0, 4)}</Avatar>
        )}
      </Tooltip>
    );
  }
}

export default UserIconPC;
