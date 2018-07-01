import React, { Component } from 'react';
import { Button, Modal, Icon } from 'antd';

import MemberTooltipAvatarPC from '../utils/MemberTooltipAvatarPC';
import SearchMemberPC from '../layout/SearchMemberPC';

class HeaderPC extends Component {
  static defaultProps = {
    teamname: 'team1',
    members: [
      {
        id: 1,
        username: 'fds',
        profile:
          'https://ucarecdn.com/80280868-a954-4114-8dbc-cfcf5c9d23f5/IMG_3128.jpg',
      },
      {
        id: 2,
        username: 'syami',
        profile:
          'https://ucarecdn.com/b8800d01-4651-4b77-8ca8-de58bb78f196/syami.jpg',
      },
      { id: 3, username: 'yooo', profile: '' },
      { id: 4, username: 'geek', profile: '' },
      { id: 5, username: 'geekerrrrrrrrr', profile: '' },
    ],
  };
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
    const { teamname, members, username } = this.props;
    // const suffix = username ? (
    //   <Icon type="close-circle" onClick={this.emitEmpty} />
    // ) : null;
    return (
      <header className="header">
        <h2 className="header__team-name">
          {teamname ? teamname : 'welcome team'}
        </h2>
        <div className="member-group">
          {members.map(member => (
            <MemberTooltipAvatarPC key={member.id} {...member} />
          ))}
        </div>
        <Button
          className="member-group__button"
          icon="user-add"
          shape="circle"
          onClick={this.showModal}
        />

        <Modal title={'New Member'} visible={false}>
          {/* <SearchMemberPC /> */}
        </Modal>
      </header>
    );
  }
}
export default HeaderPC;
