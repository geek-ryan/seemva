import React, { Component } from 'react';
import { Tooltip, Icon, Button } from 'antd';
import MemberAvatarPC from './MemberAvatarPC';

class MemberTooltipAvatarPC extends Component {
  static defaultProps = {
    username: '',
    profile: '',
  };
  render() {
    const { username, size, onRemove, useRemove } = this.props;
    return (
      <Tooltip placement="bottom" title={username}>
        {''}
        {useRemove ? (
          <div className="member-remove-usable">
            <MemberAvatarPC {...this.props} size={size} />
            <Button shape="circle" icon="close" onClick={onRemove} />
          </div>
        ) : (
          <MemberAvatarPC {...this.props} size={size} />
        )}
      </Tooltip>
    );
  }
}

export default MemberTooltipAvatarPC;
