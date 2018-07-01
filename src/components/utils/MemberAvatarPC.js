import React, { Component } from 'react';
import { Avatar } from 'antd';

class MemberAvatarPC extends Component {
  static defaultProps = {
    username: '',
    profile: '',
  };
  render() {
    const { username, profile } = this.props;
    return (
      <React.Fragment>
        {profile ? (
          <Avatar src={profile} />
        ) : (
          <Avatar>{username.substr(0, 4)}</Avatar>
        )}
      </React.Fragment>
    );
  }
}

export default MemberAvatarPC;
