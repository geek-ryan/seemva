import React, { Component } from 'react';
import { Tooltip } from 'antd';
import MemberAvatarPC from './MemberAvatarPC';

class MemberTooltipAvatarPC extends Component {
  static defaultProps = {
    username: '',
    profile: '',
  };
  render() {
    const { username } = this.props;
    return (
      <Tooltip placement="bottom" title={username}>
        {''}
        <MemberAvatarPC {...this.props} />
      </Tooltip>
    );
  }
}

export default MemberTooltipAvatarPC;
