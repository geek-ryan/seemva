import React, { Component } from 'react';
import { Avatar } from 'antd';

class MemberAvatarPC extends Component {
  static defaultProps = {
    username: '',
    profile: '',
  };
  render() {
    const { username, profile, size } = this.props;
    return (
      <React.Fragment>
        {profile ? (
          <Avatar src={profile} size={size} />
        ) : (
          <Avatar size={size}>{username.substr(0, 4)}</Avatar>
        )}
      </React.Fragment>
    );
  }
}

export default MemberAvatarPC;
